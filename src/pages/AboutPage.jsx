import Card from "../components/shared/Card"
import { Link } from 'react-router-dom'

function AboutPage() {
    return (
        <Card className='about'>
            <h1>About this Project</h1>
            <p>
                This is a React app I've created following a course on Udemy.
                This app allows the user to leave feedback for a product or service.
            </p>
            <p>Version 1.0.0</p>
            <p>
                <Link to='/'>Back To Homepage</Link>
            </p>
        </Card>
    )
}

export default AboutPage
