const Country = ({ data }) => {
    const languages = Object.values(data.languages)
    return (
        <div>
            <h2>{data.name.common}</h2>
            <p>Capital: {data.capital}</p>
            <p>Area: {data.area}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map((language) =>
                <li key={language}>{language}</li>)}
            </ul>
            <img src={data.flags.png} alt={data.flags.alt} style={{border: '1px solid lightgrey'}}/>
        </div>
    )
}

export default Country