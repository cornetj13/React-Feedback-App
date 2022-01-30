import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            "id": 1,
            "rating": 10,
            "text": "This is feedback item 1."
        },
        {
            "id": 2,
            "rating": 8,
            "text": "This is feedback item 2."
        },
        {
            "id": 3,
            "rating": 7,
            "text": "This is feedback item 3."
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add a new feedback to the feedback list.
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
    
    // Delete an existing feedback from the feedback list.
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this item?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Edit an existing feedback from the feedback list.
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // Update an edited feedback from the feedback list.
    const updateFeedback = async (id, updatedItem) => {
        setFeedback(
            feedback.map((item) => item.id === id 
            ? {...item, ...updatedItem} 
            : item
        ))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext