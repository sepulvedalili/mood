import React from "react";
import MoodSelector from '../MoodSelector';
import { render, screen, fireEvent } from "@testing-library/react";

describe('MoodSelector component', () => {
    it('render all emojis', () => {
        render(<MoodSelector selectedMood={null} onMoodSelect={() => { }} />);
        expect(screen.getByText('😊')).toBeInTheDocument();
        expect(screen.getByText('😐')).toBeInTheDocument();
        expect(screen.getByText('😢')).toBeInTheDocument();
    })
    it('renders emojis with default (non-selected) styles when no mood is selected', () => {
        render(<MoodSelector selectedMood={null} onMoodSelect={() => { }} />);
        const happyEmoji = screen.getByText('😊');
        const neutralEmoji = screen.getByText('😐');
        const sadEmoji = screen.getByText('😢');

        expect(happyEmoji).toHaveClass('bg-gray-100');
        expect(neutralEmoji).toHaveClass('bg-gray-100');
        expect(sadEmoji).toHaveClass('bg-gray-100');
    })
    it('calls onMoodSelect with correct mood when an emoji is cliked', () => {
        const mockSelect = jest.fn();

        render(<MoodSelector selectedMood={null} onMoodSelect={mockSelect} />)
        const happyEmoji = screen.getByText('😊');
        fireEvent.click(happyEmoji);

        expect(mockSelect).toHaveBeenCalledTimes(1);
        expect(mockSelect).toHaveBeenCalledWith('happy');
    });
    it('renders correctly with each mood selected', () => {
        const moods = ['happy', 'neutral', 'sad'];

        moods.forEach((moodName) => {
            render(<MoodSelector selectedMood={moodName} onMoodSelect={() => { }} />);

            moods.forEach((m) => {
                const emoji = m === 'happy' ? "😊" : m === 'neutral' ? "😐" : "😢";
                const emojiElement = screen.getByText(emoji)

                if (m === moodName) {
                    expect(emojiElement).toHaveClass('bg-green-100');
                    expect(emojiElement).toHaveClass('ring-2');
                } else {
                    expect(emojiElement).toHaveClass('bg-gray-100');
                }
            });
            document.body.innerHTML = '';
        });
    });
});