import { useContext } from "react";
import { Col, Row } from "react-bootstrap"
import BadgerBudSummary from "../../BadgerBudSummary";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudsBasket(props) {
    const context = useContext(BadgerBudsDataContext);

    // Filter out saved cats
    const savedCats = context.buds.filter(cat => context.savedCatIds.includes(cat.id) && !context.adoptedCatIds.includes(cat.id));
    //return <div>
    //    <h1>Badger Buds Basket</h1>
    //    <p>These cute cats could be all yours!</p>
    //</div>

    return <div>
    <Row className="justify-content-center">
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
    </Row>
    { savedCats.length === 0 ? (<p>You have no buds in your basket!</p>) : (
        <Row className="justify-content-center">
            {
                savedCats.map(cat => {
                    return <Col
                        xs={12}
                        md={6}
                        lg={4}
                        xxl={3}
                        key={cat.id}
                    >
                        <BadgerBudSummary 
                            {...cat} 
                            saved={true}
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