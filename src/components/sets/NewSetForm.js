import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LegoSetForm = () => {
    const [set, update] = useState({
        serialNumber: 0,
        name: "",
        piecesCount: 0,
        themeId: 0,
        imgUrl: ""
    });
    const [themes, setThemes] = useState([])
    const navigate = useNavigate();

    const localLegoUser = localStorage.getItem("lego_user");
    const legoUserObject = JSON.parse(localLegoUser);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const setToSendToApi = {
            userId: legoUserObject.id,
            name: set.name,
            serialNumber: set.serialNumber,
            piecesCount: set.piecesCount,
            themeId: parseInt(set.themeId),
            imgUrl: set.imgUrl
        };

        return fetch("http://localhost:8088/LegoSets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(setToSendToApi)
        })
            .then((response) => response.json())
            .then(() => {
                navigate("/sets");
            });
    };

    useEffect(() => {
        fetch("http://localhost:8088/LegoSetThemes")
            .then((response) => response.json())
            .then((themes) => {
                setThemes(themes)
            })
    }, []);

    return (
        <form className="setForm">
            <h2 className="setForm__title">New Lego Set</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="legoSetName">Lego Set Name:</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of the Lego Set"
                        value={set.name}
                        onChange={(evt) => {
                            const copy = { ...set };
                            copy.name = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="serialNumber">Serial Number:</label>
                    <input
                        required
                        autoFocus
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="Serial number on the set"
                        value={set.serialNumber}
                        onChange={(evt) => {
                            const copy = { ...set };
                            copy.serialNumber = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="piecesCount">Number of Pieces:</label>
                    <input
                        required
                        autoFocus
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="How many pieces are in the set"
                        value={set.piecesCount}
                        onChange={(evt) => {
                            const copy = { ...set };
                            copy.piecesCount = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="imgUrl">imgUrl:</label>
                <textarea
                    required autoFocus
                    type="text"
                    placeholder="Image address"
                    className="form-control"
                    value={set?.imgUrl}
                    onChange={
                        (evt) => {
                            const copy = { ...set }
                            copy.imgUrl = evt.target.value
                            update(copy)
                        }
                    }>{set?.imgUrl}</textarea>
            </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="theme">Set Theme:</label>
                    <select
                        id="themeDropdown"
                        value={set.themeId}
                        onChange={(evt) => {
                            const copy = { ...set };
                            copy.themeId = evt.target.value;
                            update(copy);
                        }}
                    >
                        {themes.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                                {theme.theme}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
            >
                Add Lego Set
            </button>
        </form>
    );
};