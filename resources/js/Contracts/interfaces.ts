export interface projectProps {
    id: number,
    slug: string,
    title: string,
    description: string,
}
export interface taskProps {
    id: number,
    title: string,
    state_id: number,
}
export interface stateProps {
    id: number,
    label: string,
    value: string,
}