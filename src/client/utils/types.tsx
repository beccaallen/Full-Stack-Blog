export interface IBlog {
    id: number,
    title: string,
    content: string,
    authorid: number,
    _created: Date,
    name: string
}

export interface ITag {
    id: number,
    name: string,
    _created?: Date
}