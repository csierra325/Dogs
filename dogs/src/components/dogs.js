import React from 'react'
import './dogs.css';

class Dogs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            filterDogImage: '',
            subspecies: '',
            species: '',
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

    getFilteredImg = (dog) => {
        console.log(this.state.dogList)
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
            <div className="dog-container">
                <div className="dog-header">Dog Breeds</div>
                <div className="dog-subheader">Type your favorite dog breed below</div>
                <input
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.input}
                />
                <div className="dog-results">
                    {this.state.filterDogs.map((dog) => {
                        return <button  className="dog-name" id={dog} value={dog}>{dog}</button>
                    })}
                  <div>
                    <img className="dog-img" src={this.state.filterDogImage} alt="" />
                  </div> 
                </div>
            </div>
        )
    }
};

export default Dogs
