import React from 'react'

class Dogs extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            input: '',
            Dogs: [],
        }
    }


    handleInput = (e) => {
        const input = e.target.value
        this.setState(()=>({
            input
        }))
    }

    handleSubmit = () => {
        fetch('https://dog.ceo/api/breeds/list/all')
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            debugger
            const dogList = [];
            for (const species in data.message) {

                if (data.message[species].length === 0){
                    dogList.push(species)

                }else{
                    const array = data.message[species]

                    array.forEach(subspecies => {
                        dogList.push(`${species} ${subspecies}`)
                    });
                   
                }
            }
            this.setState(() => ({
                Dogs: dogList
            }))
            const filterDogList = dogList.filter((filterDogs)=>{
                    
                return filterDogs.includes(`${this.state.input}`)
            })
        });
    }
        


    render(){
        return(  
            <div>
                <h1>Dog Breeds</h1> 
                <input  
                    type='text'
                    onChange={this.handleInput}
                    value={this.state.input}
                />
                <button onClick={this.handleSubmit}>Submit</button>

                <div>{this.state.Dogs}</div>
            </div>
        )
    }
};

export default Dogs