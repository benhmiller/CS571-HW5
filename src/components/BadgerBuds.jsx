import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {
    const [buds, setBuds] = useState([]);

    // Initialize with saved cat IDs from sessionStorage or an empty array
    const [savedCatIds, setSavedCatIds] = useState(() => { 
        return JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
    });
    const [adoptedCatIds, setAdoptedCatIds] = useState(() => {
        return JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];
    });

    // Function for saving a cat from the basket
    const saveCat = (catID, name) => {
        alert(`${name} has been added to your basket!`);
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const updatedSavedCatIds = [...savedCatIds, catID];
        setSavedCatIds(updatedSavedCatIds);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedSavedCatIds));
    }

    // Function for unsaving a cat from the basket
    const unsaveCat = (catID, name) => {
        alert(`${name} has been removed from your basket!`);
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const updatedSavedCatIds = savedCatIds.filter((id) => id !== catID);
        setSavedCatIds(updatedSavedCatIds);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedSavedCatIds));
    }

    // Function for adopting a cat
    const adoptCat = (catID, name) => {
        alert(`${name} has been adopted!`);
        const adoptedCatIDs = JSON.parse(sessionStorage.getItem("adoptedCatIds")) || [];
        const updatedAdoptedCatIds = [...adoptedCatIDs, catID];
        setAdoptedCatIds(updatedAdoptedCatIds);
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(updatedAdoptedCatIds));
    }

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw5/buds', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(cats => {
                setBuds(cats)
            })
    }, []);

    console.log(buds)

    return <div>
        <BadgerBudsNavbar />
        <div style={{ margin: "1rem" }}>
            <BadgerBudsDataContext.Provider value={{buds, adoptedCatIds, adoptCat, savedCatIds, saveCat, unsaveCat}}>
                <Outlet />
            </BadgerBudsDataContext.Provider>
        </div>
    </div>
}