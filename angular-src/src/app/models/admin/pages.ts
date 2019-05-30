export interface FAQ {
    data: Question[],
}

export interface Question {
    question: any,
    answer: any,
}

export interface About {
    layout: string, //vertical or horizontal
    text: any, 
    image: string,
}