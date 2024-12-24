
type user = {
    username: string;
    email: string;
    password: string;
}

type product = {
    name: string;
    price: number;
    description: string;
    count: number;
    groupId: string;
    creatorId: string;
}
type category = {
    name: string
    fatherId:number
    id:number
}

export type { user, product, category };