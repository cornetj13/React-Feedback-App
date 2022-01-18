import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)

    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch feedback from json server.
    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    // Add a new feedback to the feedback list.
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }
    
    // Delete an existing feedback from the feedback list.
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this item?')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE' })

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
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })

        const data = await response.json()

        setFeedback(
            feedback.map((item) => item.id === id 
            ? {...item, ...data} 
            : item
        ))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext