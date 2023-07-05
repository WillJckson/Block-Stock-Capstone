import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const SetEdit = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [themes, setThemes] = useState([])
    const [set, assignSet] = useState({
        name: "",
        serialNumber: 0,
        piecesCount: 0,
        themeId: 0,
        imgUrl: ""
    })

    useEffect(() => {
        fetch(`http://localhost:8088/LegoSets/${id}`)
            .then(response => response.json())
            .then((data) => {
                assignSet(data)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8088/LegoSetThemes")
            .then((response) => response.json())
            .then((themes) => {
                setThemes(themes)
            })
    }, [])

    const HandleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/LegoSets/${set.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(set)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/sets")
            })
    }

    return (<form className="setForm">
        <h2 className="setForm__title">edit Set</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">name:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={set?.name}
                    onChange={
                        (evt) => {
                            const copy = { ...set }
                            copy.name = evt.target.value
                            assignSet(copy)
                        }
                    }>{set?.name}</textarea>
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
                            assignSet(copy);
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
                            assignSet(copy);
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
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={set?.imgUrl}
                    onChange={
                        (evt) => {
                            const copy = { ...set }
                            copy.imgUrl = evt.target.value
                            assignSet(copy)
                        }
                    }>{set?.imgUrl}</textarea>
            </div>
        </fieldset>
        <select
            id="themeDropdown"
            value={set.themeId}
            onChange={(evt) => {
                const copy = { ...set };
                copy.themeId = parseInt(evt.target.value);
                assignSet(copy)
            }}
        >
            {themes.map((singleTheme) => (
                <option key={singleTheme.id} value={singleTheme.id}>
                    {singleTheme.theme}
                </option>
            ))}
        </select>
        <button
            onClick={(clickEvent) => HandleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>)
}