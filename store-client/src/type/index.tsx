
type user = {
    username: string;
    email: string;
    password: string;
}

type product = {
    id: number;
    name: string;
    price: number;
    description: string;
    count: number;
    groupId: number;
    creatorId: number;
    image: string;
}
type category = {
    products: product[];
    name: string
    fatherId:number
    id:number
    children:category[]
}

export type { user, product, category };