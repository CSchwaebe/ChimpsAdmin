/////////////////////////////////////////////////
//                  STYLE
/////////////////////////////////////////////////

export interface Style {
    width?: string,
    height?: string,
}


/////////////////////////////////////////////////
//                  SPACER
/////////////////////////////////////////////////

export interface Spacer {
    data: SpacerBlockData;
}

export interface SpacerBlockData {
    style: Style,
    sortOrder: number

}

/////////////////////////////////////////////////
//                  TEXT
/////////////////////////////////////////////////

export interface Text {
    data: TextBlockData;
}
   

export interface TextBlockData {
    text: any,
    style: Style,
    sortOrder: number
}


/////////////////////////////////////////////////
//                  IMAGE
/////////////////////////////////////////////////

export interface Image {
    data: ImageBlockData;
}

export interface ImageBlockData {
    text: any,
    image: string,
    style: Style,
    sortOrder: number
}

/////////////////////////////////////////////////
//                  VIDEO
/////////////////////////////////////////////////

export interface Video {
    data: VideoBlockData;
}

export interface VideoBlockData {
    text: any,
    url: string,
    style: Style,
    sortOrder: number
}