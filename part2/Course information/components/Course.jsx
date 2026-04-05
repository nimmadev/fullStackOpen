const Course = ({ course }) => {
    return <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
    </>

}
const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>
}

const Part = ({ part, exercise }) => {
    return <p>
        {part} {exercise}
    </p>
}
const Content = ({ parts }) => {
    console.log(parts)
    return <>
        {parts.map((part, index) => <Part key={index} part={part.name} exercise={part.exercises} />)}
        <Total parts={parts} />
    </>
}

const Total = ({ parts }) => {
    return <h3>Total of {
        parts.reduce(
            (acc, curr) => acc + curr.exercises, 0)
    } exercises</h3>
}
export default Course;