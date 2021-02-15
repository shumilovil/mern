import React, { useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (error) {

            }
        }
    }

    return (
        <div className='row'>
            <div className="div col s8 offest-s2" style={{ paddingTop: '2rem' }}></div>
            <div className="input-field">
                <input
                    placeholder="Enter link"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler} />
                <label htmlFor="link">Insert link</label>
            </div>
        </div>
    )
}

