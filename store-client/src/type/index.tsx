
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

export type { user, product };