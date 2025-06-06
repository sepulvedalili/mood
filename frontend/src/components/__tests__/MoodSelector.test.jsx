import React from "react";
import MoodSelector from '../MoodSelector';
import { render, screen, fireEvent } from "@testing-library/react";

describe('MoodSelector component', () => {
    it('calls onMoodSelect with correct mood when an emoji is cliked', () => {
        const mockSelect = jest.fn();

        render(<MoodSelector selectedMood={null} onMoodSelect={mockSelect} />)
        const happyEmoji = screen.getByText('😊');
        fireEvent.click(happyEmoji);

        expect(mockSelect).toHaveBeenCalledTimes(1);
        expect(mockSelect).toHaveBeenCalledWith('happy');
    });


})