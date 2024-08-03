import { QuestionProps } from '../../molecules/Question'

export interface SummaryProps {
    items: QuestionProps[];
    handleSubmit?: () => {}
}