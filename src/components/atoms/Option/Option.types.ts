export interface OptionProps {
    id: number;
    label: string;
    imageUrl: string;
    isSelected: boolean;
    handleOptionSelection?: (answerId: number) => void;
}