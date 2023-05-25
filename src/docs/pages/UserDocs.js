import React from 'react'
import { useParams } from 'react-router-dom'
import DocsList from '../components/DocsList'

const DUMMY_DOCS = [
    {
        id: 'd1',
        title: 'IIT Delhi',
        description: 'India one of the top institution in the world.',
        imageUrl: 'https://home.iitd.ac.in/images/gallery/gallery-lg1.jpg',
        creator: 'u2'
    },
    {
        id: 'd2',
        title: 'IIT Bombay',
        description: 'India one of the top institution in the world.',
        imageUrl: 'https://www.careerindia.com/img/1200x60x675/2013/12/30-iitbombay.jpg',
        creator: 'u1'
    }
]

const UserDocs = () => {

    const userId = useParams().userid;
    const loadedDocs = DUMMY_DOCS.filter(doc => doc.creator === userId)
    return <DocsList items={loadedDocs} />
}

export default UserDocs
