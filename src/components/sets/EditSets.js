import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const SetEdit = () => {
    const [set, assignSet] = useState({
        name: "",
        serialNumber: 0,
        piecesCount: 0,
        themeId: 0
    })
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/LegoSets/${id}`)
            .then(response => response.json())
            .then((data) => {
                assignSet(data)
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
        <button
            onClick={(clickEvent) => HandleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>)
}