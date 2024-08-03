import { OptionsListProps } from '../OptionsList'

export interface QuestionProps extends OptionsListProps {
    question: string;
    id: number;
}