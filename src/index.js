import React from 'react'; 
import ReactDOM from 'react-dom'; 
import "./index.css"


{/* We need multiple different classes here. 
    1. Overarching container (DONE, incomplete however) 
    2. GPA values on the left side (DONE) 
    3. List of all classes on the right hand side with:  
        a. Name of Class
        b. Number of Units 
        c. Gen Ed/Major/ etc 
    4. Semester View that have: 
        a. Name of Class (Dropdown) 
        b. Grade of Class 
    5. Major View 
*/}

function GPAinput(props) { 
    return (
    <div class = "row gparow"> 
        <label class = "gpalabel" htmlFor = {props.name}> {props.label} </label>
        <input class = "gpainput" 
            id = {props.name}
            name = {props.name} 
            type = "text"
            value = {props.getValue}
            onChange = {props.handleChange}
        />
    </div> 
    ) 
}
class GPAchanger extends React.Component { 
    constructor(props) { 
        super(props);
        this.state = { 
            grades : this.props.grades
        };
        this.handleChange = this.handleChange.bind(this);
    }
    getValue(label) { 
        return this.state.grades[label];
    }
    handleChange(event) { 
        const temp = Object.assign({}, this.state.grades)
        temp[event.target.name] = event.target.value;
        this.setState({ 
            grades: temp
        })
        this.props.handleGPAChange(temp);
    }
    renderGPAinput(label, i) { 
        return ( 
            <GPAinput
                name = {label}
                label = {label} 
                getValue = {this.getValue(label)}
                handleChange = {this.handleChange}
            /> 
        )
    }
    render() { 
        const gpatitle = <div class = "row gpatitle"> 
        <p> Grading Scale  </p> 
        </div> ; 
        return ( 
        <div> 
            {gpatitle}
            {this.renderGPAinput("A+", 0)}
            {this.renderGPAinput("A", 1)}
            {this.renderGPAinput("A-", 2)}
            {this.renderGPAinput("B+", 3)}
            {this.renderGPAinput("B", 4)}
            {this.renderGPAinput("B-", 5)}
            {this.renderGPAinput("C+", 6)}
            {this.renderGPAinput("C", 7)}
            {this.renderGPAinput("C-", 8)}
            {this.renderGPAinput("D+", 9)}
            {this.renderGPAinput("D", 10)}
            {this.renderGPAinput("D-", 11)}
            {this.renderGPAinput("F", 12)}
            {this.renderGPAinput("P", 13)}
            {this.renderGPAinput("NP", 14)}
        </div> 
        )

    }
}

class Classelem extends React.Component { 
    constructor(props) { 
        super(props) 
        this.state = { 
            name: "",
            value: "",
            unit: "",
        }
    }
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
        this.props.handleNameChange(event.target.value, this.props.number);
    }

    handleGPAChange = (event) => { 
        this.setState({
            value: event.target.value
        });
        this.props.handleGPAChange(event.target.value, this.props.number);
    }
    handleUnitChange = (event) => {
        var val = event.target.value;
        val = val == "" ? "": parseFloat(val);
        this.setState({
            unit: val
        });

        this.props.handleUnitChange(val, this.props.number);
    }

    
    render () {
        return (
            <div class = "row">
                <div class = "col-md-7 classval">
                    <input 
                        id = {this.props.label}
                        name = {this.props.label}
                        value = {this.state.name}
                        onChange = {this.handleNameChange}
                    /> 
                </div>
                <div class = "col-md-2 gradeval"> 
                <select value = {this.state.value} onChange = {this.handleGPAChange}>
                    <option value ="A+"> A+ </option>
                    <option value ="A"> A </option>
                    <option value ="A-"> A- </option>
                    <option value ="B+"> B+ </option>
                    <option value ="B"> B </option>
                    <option value ="B-"> B- </option>
                    <option value ="C+"> C+ </option>
                    <option value ="C"> C </option>
                    <option value ="C-"> C- </option>
                    <option value ="D+"> D+ </option>
                    <option value ="D"> D </option>
                    <option value ="D-"> D- </option>
                    <option value ="F"> F </option>
                    <option value ="P"> P </option>
                    <option value ="NP"> NP </option>
                </select>
                </div> 
                <div class = "col-md-3 unitval"> 
                <input  
                    id = {this.props.label}
                    name = {this.props.label}
                    value = {this.state.unit} 
                    type = "number"
                    min = "0"
                    onChange = {this.handleUnitChange}
                />
                </div>
            </div> 
        )
    }
}

class Semester extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state  = { 
            gpa_sem: 0, 
            units_sem: 0,
            classes: [0, 1, 2, 3, 4],
            units: [0, 0, 0, 0, 0],
            names: Array(5), 
            gpas: ["A+", "A+", "A+", "A+", "A+"]
        }; 
    }

    handleNameChange = (name, i) => { 
        var temp = this.state.names.slice(); 
        temp[i] = name;
        this.setState({
            names: temp,
        })
    }

    handleGPAChange = (value, i) => { 
        var temp = this.state.gpas.slice(); 
        temp[i] = value; 
        this.setState({ 
            gpas: temp,
            gpa_sem: this.props.calculateGPA(this.state.units, temp, this.props.number)
        })
         
    }

    handleUnitChange = (value, i) => { 
        var temp = this.state.units.slice(); 
        temp[i] = value == "" ? 0: value; 
        this.setState({ 
            units: temp,
            units_sem: temp.reduce((a,b) => a + b, 0),
            gpa_sem: this.props.calculateGPA(temp, this.state.gpas, this.props.number)
        })
        
    }

    renderClass = (label, i ) => { 
        return ( 
            <Classelem 
                label = {label}
                number = {i}
                handleNameChange = {this.handleNameChange}
                handleGPAChange = {this.handleGPAChange}
                handleUnitChange = {this.handleUnitChange} 
            /> 
        )
    }
    render() { 
        const classlist = this.state.classes.map((classelem) => this.renderClass(this.props.label + classelem, classelem));
        return ( 
            <div class = "semester"> 
            <div class = "semesterheader"> 
                {this.props.label}
            </div> 
            <div class = "row semlabels"> 
                <div class = "col-md-7 classval"> Class Name</div>
                <div class = "col-md-2 gradeval-no"> Grade </div> 
                <div class = "col-md-3 unitval"> Units </div>
            </div> 
             {classlist}
            <div class = "row">  
                <div class = "col-md-6 textalign"> 
                    <h5> Units  </h5> 
                    {this.state.units_sem} 
                </div> 
                <div class = "col-md-6 textalign"> 
                    <h5> GPA  </h5> 
                    {this.state.gpa_sem}
                </div> 
            </div> 
            </div> 
            
        )
    }
}

class Scheduler extends React.Component { 
    constructor(props) { 
        super(props)
        this.state = { 
            grades : { 
                "A+": 4.0, 
                "A": 4.0, 
                "A-": 3.7, 
                "B+": 3.3, 
                "B": 3.0, 
                "B-": 2.7, 
                "C+": 2.3,
                "C": 2.0, 
                "C-": 1.7, 
                "D+": 1.3, 
                "D": 1.0,
                "D-": .7, 
                "F": 0,
                "P" : "N/A", 
                "NP" : "N/A", 
            },
            gpas: new Array(8).fill(0), 
            unit_tots: new Array(8).fill(0), 
            unit_relev_tots:  new Array(8).fill(0), 
            system: "Semester", 
            startyear: 2018,
            cumm_gpa: "N/A", 
            cumm_unit: 0, 
            cumm_relev_units: 0

        }
        this.handleGPAscaleChange.bind(this);
        this.calculateGPA.bind(this);
    }

    handleGPAscaleChange = (newgrades) => { 
        this.setState({
            grades: newgrades
        })
    }

    renderGPAscale () { 
        return (
        <GPAchanger 
            grades = {this.state.grades} 
            handleGPAChange = {this.handleGPAscaleChange}
        /> 
        )
    }

    calculateGPA = (units, gpa, number) => { 
        var gpa_sum = 0;
        var tot = 0;
        var tot_units = 0;
        for (var i = 0; i< gpa.length; i ++ ) { 
            var grade = this.state.grades[gpa[i]];
            if (!isNaN(Number(grade))) { 
                gpa_sum += units[i] * grade ; 
                tot += units[i]
            };
            tot_units += units[i];
        };
        var temp_tot = this.state.unit_relev_tots.slice();
        var temp_tot_units = this.state.unit_tots.slice(); 
        var temp_gpa_sum = this.state.gpas.slice(); 
        temp_gpa_sum[number] = 0 ? 0 : gpa_sum/tot;
        temp_tot[number] = tot; 
        temp_tot_units[number] = tot_units;
        this.setState({ 
            gpas: temp_gpa_sum, 
            unit_relev_tots: temp_tot,
            unit_tots: temp_tot_units
        })
        this.OverallStats(temp_gpa_sum, temp_tot, temp_tot_units)
        return (
            (tot == 0 ? 0 : (gpa_sum/tot).toFixed(3))
        )
    }
    OverallStats = (gpas, units, relev_units) => { 
        var tot_gpa = 0;
        var tot_units = 0;
        var tot_relev_units = 0;
        for (var i = 0; i < gpas.length; i ++ ){
            const grade = gpas[i]; 
            if (!isNaN(grade)) { 
                tot_gpa += relev_units[i] * gpas[i];
                tot_units += units[i]; 
                tot_relev_units += relev_units[i];
            } 
        }
        console.log(tot_gpa);
        console.log(tot_relev_units);
        const cummulative_gpa = (tot_relev_units== 0? 0 : tot_gpa/tot_relev_units); 
        this.setState({ 
            cumm_gpa: (cummulative_gpa == 0? "N/A": cummulative_gpa.toFixed(3)), 
            cumm_relev_units: tot_relev_units,
            cumm_unit: tot_units
        })
    }

    changeSystem = (event) => {
        this.setState({ 
            system: event.target.value,
            gpas: Array(12).fill(0),
            unit_relev_tots: Array(12).fill(0),
            unit_tots: Array(12).fill(0)
            }
        )
    }


    renderSemester= (name, number) => { 
        return ( 
            <Semester 
                calculateGPA = {this.calculateGPA} 
                label = {name}
                number = {number}
            />
        )
    }

    render() {
        const sys = this.state.system; 
        let layout;
        if (sys == "Semester") { 
            // The goal here is to have 2 per row
            const years = [0, 1, 2, 3]
            layout = years.map(num => 
                <div class = "row">
                    <div class = "col-md-6"> 
                        {this.renderSemester("Fall " + (num +this.state.startyear), 2*num)}
                    </div> 
                    <div class = "col-md-6"> 
                        {this.renderSemester("Spring " + (num + this.state.startyear + 1), 2*num + 1)}
                    </div>
                </div> 
                )
        } else { 
            // The goal her is to have 3 per row 
            const years = [0, 1, 2, 3]
            layout = years.map(num => 
                <div class = "row">
                    <div class = "col-md-4"> 
                        {this.renderSemester("Fall " + (this.state.startyear + num), 3*num)}
                    </div> 
                    <div class = "col-md-4"> 
                        {this.renderSemester("Winter " + (this.state.startyear + num + 1), 3*num + 1)}
                    </div>
                    <div class = "col-md-4"> 
                        {this.renderSemester("Spring " + (this.state.startyear + num + 1), 3*num + 2)}
                    </div>
                </div> 
                )
        }

        return ( 
            <div class = "container"> 
                <div class = "row titler"> 
                    <h3 > 4 YEAR PLAN </h3>
                    <p> You can use this to plan out your academic career at any type of institution, 
                        specifically aimed at college or graduate students. </p>  
                    <label style = {{paddingRight:'8px'}}> School System: </label> 
                    <select  value = {this.state.system} onChange = {this.changeSystem}> 
                        <option value  = "Semester">  Semester</option> 
                        <option value = "Quarter"> Quarter</option>
                    </select>
                    <label style = {{paddingRight:'8px', paddingLeft: '14px'}}> Start Year:   </label> 
                    <input 
                        id = "Starting semester"
                        name = "Starting semester"
                        type = "number"
                        value = {this.state.startyear}
                        onChange = {(event) => {this.setState({ startyear: Number(event.target.value)})}}
                    /> 
                </div> 
                <div class = "row textalign"> 
                    <label style = {{paddingRight:'8px'}}> Cummulative GPA </label> 
                    {this.state.cumm_gpa} 
                    <label style = {{paddingRight:'8px', paddingLeft: '8px'}}> Total Units </label> 
                    {this.state.cumm_unit} 
                    <label style = {{paddingRight:'8px', paddingLeft: '8px'}}> Total Credited Units </label> 
                    {this.state.cumm_relev_units} 

                </div>
                <div class = "row" > 
                    <div class = "col-md-1">
                        {this.renderGPAscale()}
                    </div> 
                    <div class = "col-md-1"></div> 
                    <div class = "col-md-9">
                        {layout}
                    </div> 
                </div> 
            </div>
        )
    }
}

ReactDOM.render(
      <Scheduler/>,
    document.getElementById('root')
  );
  