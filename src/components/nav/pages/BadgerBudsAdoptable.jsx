import { useContext } from "react";
import { Col, Row } from "react-bootstrap"
import BadgerBudSummary from "../../BadgerBudSummary";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsAdoptable(props) {
    const context = useContext(BadgerBudsDataContext);

    // Filter out saved cats
    const unsavedCats = context.buds.filter(cat => !context.savedCatIds.includes(cat.id) && !context.adoptedCatIds.includes(cat.id));

    return <div>
        <Row className="justify-content-center">
            <h1>Available Badger Buds</h1>
            <p>The following cats are looking for a loving home! Could you help?</p>
        </Row>
        { unsavedCats.length === 0 ? (<p>No buds are available for adoption!</p>) : (
            <Row className="justify-content-center">
            {
                unsavedCats.map(cat => {
                    return <Col
                        xs={12}
                        md={6}
                        lg={4}
                        xxl={3}
                        key={cat.id}
                    >
                        <BadgerBudSummary 
                            {...cat}
                            saved={false}
                            saveCat={context.saveCat}
                            adoptCat={context.adoptCat}
                            unsaveCat={context.unsaveCat}
                        />
                    </Col>     
                })
            }
            </Row>
        )}
    </div>
}