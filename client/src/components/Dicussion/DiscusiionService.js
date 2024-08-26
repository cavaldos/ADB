import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function DiscusiionService() {
    const [discussions, setDiscussions] = useState([])
    const { discussionID } = useParams()
    return {
        discussionID,
        discussions,
        setDiscussions
    }
}

export default DiscusiionService