import React from 'react'

class Dogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            filterDogImage: '',
            dogs: [],
            filterDogs: [],
        }
    }

    componentDidMount = () => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const dogList = [];
                for (const species in data.message) {
                    if (data.message[species].length === 0) {
                        dogList.push(species)
                    } else {
                        const array = data.message[species]
                        array.forEach(subspecies => {
                            dogList.push(`${subspecies} ${species}`)
                        });
                    }
                    this.setState(() => ({
                        dogs: dogList,
                    }))
                }
            });
    }

    filterDogList = (filter) => {
        return this.state.dogs.filter((dog) => {
            return dog.includes(filter)
        })
    }

    getFilteredImg = () => {
        fetch(`https://dog.ceo/api/breed/${this.state.filterDogs}/images/random`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data.message)
            this.setState(() => ({
                filterDogImage: data.message
            }))
        })
    }

    handleInput = (e) => {
        const input = e.target.value
        this.setState(() => ({
            input,
            filterDogs: this.filterDogList(input),
        }))
        this.getFilteredImg()
    }

    render() {
        return (
            <div>
                <h1>Dog Breeds</h1>
                <input
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.input}
                />
                {this.state.filterDogs.map((dog) => {
                    return <div>{dog}</div>
                })}
                <img src={this.state.filterDogImage} alt="dog" />

            </div>
        )
    }
};

export default Dogs
