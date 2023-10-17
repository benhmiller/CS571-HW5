
import { Button, Card, Carousel } from "react-bootstrap";
import { useState } from "react";

const BadgerBudSummary = (props) => {
    // State Variables
    const [showMore, setShowMore] = useState(false);
    const [buttonText, setButtonText] = useState("Show More");
  
    // Toggle Function for "Show More Button"
    const toggleShowMore = () => {
      setShowMore(!showMore);
      setButtonText(showMore ? "Show More" : "Show Less");
    };

    // Parse Age for "Pretty Printing"
    const ageDiv = () => {
        if(props.age < 12) {
            return <p>{props.age} month(s) old.</p>
        }
        else {
            const years = Math.floor(props.age / 12);
            const months = props.age % 12;
            return <p>{years} year(s) and {months} month(s) old.</p>
        }
    }

    // Establish Additional Information for Pressing "Show More" Button
    const additionalInfo = showMore ? (
        <div>
            <p>{props.gender}</p>
            <p>{props.breed}</p>
            {ageDiv()}
            {
                props.description ? (<p> {props.description} </p>) : <div/>
            } 
        </div>
    ) : null;

    // Handle Adoptable vs. Basket Cat Card Footer
    const cardFooter = !props.saved ? (
        <Card.Footer>
            <Button variant="primary" onClick={toggleShowMore} style={{ marginRight: "5px" }}>{buttonText}</Button>
            <Button variant="secondary" onClick={() => props.saveCat(props.id, props.name)}>❤️ Save</Button>
        </Card.Footer>
    ) : (
        <Card.Footer>
            <Button variant="secondary" onClick={() => props.unsaveCat(props.id, props.name)} style={{ marginRight: "5px" }}>Unselect</Button>
            <Button variant="success" onClick={() => props.adoptCat(props.id, props.name)}>💕 Adopt</Button>
        </Card.Footer>
    );

    return <Card style={{margin: "0.25rem",  width: "300px"}}>
        {
            !showMore ? (
                <Card.Img 
                    variant="top"
                    src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
                    alt="Image of available cat."
                    style={{ height: "300px", objectFit: "cover" }}
                />
            ) : (
                <Carousel>
                    {props.imgIds.map((image,index) => (
                            <Carousel.Item key={index}>
                                <Card.Img
                                    variant="top"
                                    src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${image}`}
                                    alt="Image of available cat."
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                            </Carousel.Item>
                    ))}
                </Carousel>
            )
        }
        
        <Card.Body>
            <h1 style={{margin: "0.25rem", fontSize: "1.8rem"}}>{props.name}</h1>
            {additionalInfo}
        </Card.Body>
        {cardFooter}
    </Card>
}

export default BadgerBudSummary;