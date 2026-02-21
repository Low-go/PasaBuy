
// lookup table for our default image selections
export const avatarImages: { [key: string]: any} = {
    'bunny.jpg': require('../../assets/images/bunny.jpg'),
    'user.jpg': require('../../assets/images/user.jpg'),
    'horse.jpg': require('../../assets/images/horse.jpg'),
    'eagle.jpg': require('../../assets/images/eagle.jpg'),
    'tiger.jpg': require('../../assets/images/tiger.jpg'),
    'dog.jpg': require('../../assets/images/dog.jpg'),
    'cat.jpg': require('../../assets/images/cat.jpg'),
    'deer.jpg': require('../../assets/images/deer.jpg'),
    'yak.jpg': require('../../assets/images/yak.jpg'),
}


export function getAvatar(avatar_url: string | null){
    if (!avatar_url) return avatarImages['user.jpg']

    //make a clause if it is a url when implementing s3 bucket

    return avatarImages[avatar_url]
}