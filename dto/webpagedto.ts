

interface loginDto {
    email : string ,
    password : string
}

interface registerDto{
    name : string
    email : string,
    password : string
}

interface resetDto {
    readonly email? : string ,
    password : string,
    conformpassword : string 
}

interface emailverifyDto{
    email : string
}

export {emailverifyDto,loginDto,registerDto,resetDto}

