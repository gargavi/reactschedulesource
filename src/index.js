import React from 'react'; 
import ReactDOM from 'react-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { Collapse, Button, CardBody, Card } from 'reactstrap';



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
            grade: "A+",
            unit: "",
            previous: "",
            weighted: false
        }
    }
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
        this.props.handleNameChange(event.target.value, this.props.number);
        
    }
    handleNameBlur  = (event) => {
        this.setState({ 
            previous: event.target.value
        })
        this.props.handleChange(this.props.label, event.target.value, this.state.grade, this.state.unit, this.state.weighted);
    }

    handleGPAChange = (event) => { 
        this.setState({
            grade: event.target.value
        });
        this.props.handleGPAChange(event.target.value, this.props.number);
        this.props.handleChange(this.props.label, this.state.name, event.target.value, this.state.unit, this.state.weighted);
    }
    handleUnitChange = (event) => {
        var val = event.target.value;
        val = val == "" ? "": parseFloat(val);
        this.setState({
            unit: val
        });
        this.props.handleUnitChange(val, this.props.number);
        this.props.handleChange(this.props.label, this.state.name, this.state.grade, event.target.value, this.state.weighted);
    }
    handleWeightChange = () => { 
        this.setState({ 
            weighted: !this.state.weighted
        })
        this.props.handleWeightChange(!this.state.weighted, this.props.number);
        this.props.handleChange(this.props.label, this.state.name, this.state.grade, this.state.unit, !this.state.weighted);
    }


    render () {
        return (
            <tr>
                <td class = "checkcell"> 
                    <input 
                        name = "weighted"
                        type = "checkbox"
                        checked = {this.state.weighted}
                        onChange = {this.handleWeightChange}
                    /> 
                </td> 
                <td class = "namecell">
                    <input
                        id = {this.props.label}
                        name = "name"
                        value = {this.state.name}
                        onChange = {this.handleNameChange}
                        onBlur = {this.handleNameBlur}
                    /> 
                </td>
                <td class = "gradecell" > 
                <select name = "grade" value = {this.state.value} onChange = {this.handleGPAChange}>
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
                </td> 
                <td class = "unitcell"> 
                <input  
                    id = {this.props.label}
                    name = "unit"
                    value = {this.state.unit} 
                    type = "number"
                    min = "0"
                    onChange = {this.handleUnitChange}
                />
                </td>
            </tr> 
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
            names: Array(5).fill(""), 
            gpas: ["A+", "A+", "A+", "A+", "A+"],
            weights: Array(5).fill(false)
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
            gpa_sem: this.props.calculateGPA(this.state.units, temp, this.props.number, this.state.weights)
        })
         
    }

    handleUnitChange = (value, i) => { 
        var temp = this.state.units.slice(); 
        temp[i] = value == "" ? 0: value; 
        this.setState({ 
            units: temp,
            units_sem: temp.reduce((a,b) => a + b, 0),
            gpa_sem: this.props.calculateGPA(temp, this.state.gpas, this.props.number, this.state.weights)
        })
        
    }
    handleChange = (label, name, gpa, units, weighted) => { 
        this.props.handleChange(label, name, gpa, units, weighted, this.props.label);
    }
    handleWeightChange = (value, i ) => { 
        var temp = this.state.weights.slice(); 
        temp[i] = value;
        this.setState({ 
            weights: temp,
            gpa_sem: this.props.calculateGPA(this.state.units, this.state.gpas, this.props.number, temp)
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
                handleChange = {this.handleChange}
                remove = {this.props.removeClassEntry}
                handleWeightChange = {this.handleWeightChange}
            /> 
        )
    }
    addClass = () => { 
        var classes_temp = this.state.classes.slice();
        var units_temp = this.state.units.slice();
        var names_temp = this.state.names.slice(); 
        var gpas_temp = this.state.gpas.slice();
        var weights_temp = this.state.weights.slice();
        classes_temp.push(classes_temp.length); 
        units_temp.push(0); 
        names_temp.push("");
        gpas_temp.push("A+");
        weights_temp.push(false);
        this.setState({ 
            classes: classes_temp,
            units: units_temp,
            names: names_temp,
            gpas: gpas_temp,
            weights: weights_temp
        })
    }
    removeClass = () => { 
        var classes_temp = this.state.classes.slice(0, -1); 
        var units_temp = this.state.units.slice(0, -1);
        var names_temp = this.state.names.slice(0, -1); 
        var gpas_temp = this.state.gpas.slice(0, -1);
        var weights_temp = this.state.weights.slice(0, -1);
        this.setState({ 
            classes: classes_temp,
            units: units_temp,
            names: names_temp,
            gpas: gpas_temp,
            weights: weights_temp
        })
    }
    render() { 
        const classlist = this.state.classes.map((classelem) => this.renderClass(this.props.label + classelem, classelem));
        return ( 
            <div class = "semester"> 
            <div class = "semesterheader"> 
                {this.props.label}
            </div> 
            <table>   
            <thead> 
                <tr class = "semlabels">
                    <th>  </th>  
                    <th> Class Name</th>
                    <th> Grade </th> 
                    <th> Units </th>
                </tr> 
            </thead> 
            <tbody> 
            {classlist}    
             <tr> 
                 <td class = "checkcell"> 
                 </td> 
                <td class = "namecell">
                    <Button color = "success" style = {{"padding-top": "1%", "padding-bottom": "1%", "marginRight": "4%"}} onClick = {this.addClass}> +  </Button> 
                    <Button color = "danger" style = {{"padding-top": "1%", "padding-bottom": "1%"}} onClick = {this.removeClass}>  - </Button> 
                </td>
                <td class = "gradecell"> 
                    <label> GPA:  </label> 
                    {this.state.gpa_sem}
                </td> 
                <td class = "unitcell"> 
                    <label> UNITS: </label>
                    {this.state.units_sem} 
                </td> 
            </tr>
            </tbody>
             </table> 
            </div> 
            
        )
    }
}

class MajorEleme extends React.Component { 
    constructor(props) { 
        super(props) 
        this.state = { 
            name: "",
            grade: "", 
            unit: "", 
            year: ""
        }
    }
    nameChange = (event) => { 
        const [grade, unit, year] = this.props.getValue(event.target.value, this.props.number);
        this.setState({ 
            name: event.target.value, 
            grade: grade, 
            unit: unit, 
            year: year
        })
    }
    render() {
        var names = this.props.names.map( (name) => <option value = {name}> {name} </option> )
        return (
            
            <tr> 
                <td class = "namemajorcell"> 
                    <select style = {{"width" : "100%"}} value = {this.state.name} onChange = {this.nameChange}> 
                        {names}
                    </select> 
                </td>
                <td class = "grademajorcell"> 
                    {this.state.grade}
                </td>
                <td class = "unitmajorcell"> 
                    {this.state.unit}
                </td> 
                <td class = "yearmajorcell"> 
                    {this.state.year}
                </td> 
            </tr> 
            
        )
    }
}

class MajorViewer extends React.Component { 
    constructor(props) { 
        super(props) 
        this.state = { 
            unit_tots: 0, 
            gpa_cumm: "N/A", 
            classes: [0, 1, 2, 3, 4, 5, 6, 7],
            units: Array(8).fill(0),
            names: Array(8).fill(""), 
            gpas: Array(8).fill("A+"),
            weights: Array(8).fill(false)
        }
    }
    
    implementChange = (name, i) => { 
        const[name2, gpa, unit, year, weight] = this.props.getValue(name);

        var gpa_temp = this.state.gpas.slice();
        var units_temp = this.state.units.slice(); 
        var names_temp = this.state.names.slice(); 
       
        var weights_temp = this.state.weights.slice(); 
        gpa_temp[i] = gpa; 
        names_temp[i] = name2; 
        units_temp[i] = Number(unit); 
        weights_temp[i] = weight;

        this.setState({ 
            units: units_temp, 
            gpas: gpa_temp, 
            names: names_temp,
            unit_tots: units_temp.reduce((a,b) => a + b, 0),
            gpa_cumm: this.props.calculateGPA(units_temp, gpa_temp, -1, weights_temp),
            weights: weights_temp
        })
        return ([gpa, unit, year])
    }
    renderMajorElem = (i) => {
        return ( 
            <MajorEleme
                names = {this.props.names}
                getValue = {this.implementChange}
                number = {i}
            />
        )
    }
    addClass = () => { 
        var classes_temp = this.state.classes;
        var units_temp = this.state.units;
        var names_temp = this.state.names; 
        var gpas_temp = this.state.gpas;
        classes_temp.push(classes_temp.length); 
        units_temp.push(0); 
        names_temp.push("");
        gpas_temp.push("A+");
        this.setState({ 
            classes: classes_temp,
            units: units_temp,
            names: names_temp,
            gpas: gpas_temp
        })
    }
    removeClass = () => { 
        var classes_temp = this.state.classes;
        var units_temp = this.state.units;
        var names_temp = this.state.names; 
        var gpas_temp = this.state.gpas;
        classes_temp = classes_temp.slice(0, -1); 
        units_temp = units_temp.slice(0, -1);
        names_temp = names_temp.slice(0, -1); 
        gpas_temp = gpas_temp.slice(0, -1);
        this.setState({ 
            classes: classes_temp,
            units: units_temp,
            names: names_temp,
            gpas: gpas_temp
        })
    }


    render () { 
        var names = this.state.classes.map((num) => this.renderMajorElem(num)); 
        return ( 
            <table class = "table">
                <thead>
                <tr class = "semlabels"> 
                    <th> Class Name </th>
                    <th> Grade </th>
                    <th style = {{"paddingLeft": "3%"}} > Units </th> 
                    <th> Year </th>
                </tr> 
                </thead>
                <tbody> 
                    {names}
                    <tr> 
                    <td class = "namecell">
                        <Button color = "success" style = {{"padding-top": "1%", "padding-bottom": "1%", "marginRight": "4%"}} onClick = {this.addClass}> +  </Button> 
                        <Button color = "danger" style = {{"padding-top": "1%", "padding-bottom": "1%"}} onClick = {this.removeClass}>  - </Button> 
                    </td>
                    <td class = "gradecell"> 
                        <label> GPA:  </label> 
                        {this.state.gpa_cumm}
                    </td> 
                    <td class = "unitcell"> 
                        <label> UNITS: </label>
                        {this.state.unit_tots} 
                    </td> 
                    </tr>
                </tbody>
            </table>
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
            gpas: new Array(9).fill(0), 
            unit_tots: new Array(9).fill(0), 
            unit_relev_tots:  new Array(9).fill(0), 
            system: "Semester", 
            startyear: 2018,
            cumm_gpa: "N/A", 
            cumm_unit: 0, 
            cumm_relev_units: 0, 
            opened: Array(4).fill(true),
            classdict: Object({ 
                "": ["", "", ""]
            }),
            allclasses: [""]

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
    
    calculateGPA = (units, gpa, number, weights) => { 
        // NEED TO FIX CALCULATOR
        var gpa_sum = 0;
        var tot = 0;
        var tot_units = 0;
        for (var i = 0; i< gpa.length; i ++ ) { 
            var grade = this.state.grades[gpa[i]];
            if (!isNaN(Number(grade))) {
                if (weights[i]) { 
                    gpa_sum += units[i] * (grade + 1) ; 
                    tot += units[i]
                } else { 
                    gpa_sum += units[i] * grade ; 
                    tot += units[i]
                }
            };
            tot_units += units[i];
        };
        if (!(number == -1) ) {
            var temp_tot = this.state.unit_relev_tots.slice();
            var temp_tot_units = this.state.unit_tots.slice(); 
            var temp_gpa_sum = this.state.gpas.slice();
            temp_gpa_sum[number + 1] = 0 ? 0 : gpa_sum/tot;
            temp_tot[number + 1] = tot; 
            temp_tot_units[number + 1] = tot_units;
            this.setState({ 
                gpas: temp_gpa_sum, 
                unit_relev_tots: temp_tot,
                unit_tots: temp_tot_units
            })
            this.OverallStats(temp_gpa_sum, temp_tot, temp_tot_units)
        }
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
        const cummulative_gpa = (tot_relev_units== 0? 0 : tot_gpa/tot_relev_units); 
        this.setState({ 
            cumm_gpa: (cummulative_gpa == 0? "N/A": cummulative_gpa.toFixed(3)), 
            cumm_relev_units: tot_relev_units,
            cumm_unit: tot_units
        })
    }
    changeSystem = (event) => {
        if (event.target.value == "Semester") { 
            this.setState({ 
                system: event.target.value,
                gpas: Array(8).fill(0),
                unit_relev_tots: Array(8).fill(0),
                unit_tots: Array(8).fill(0),
                }
            )
        } else {
            this.setState({ 
                system: event.target.value,
                gpas: Array(12).fill(0),
                unit_relev_tots: Array(12).fill(0),
                unit_tots: Array(12).fill(0),
                }
            )
        }
    }
    //this.props.handleChange(label, name, gpa, units, weighted, this.props.label);
    handleclassChanges = (classlabel, name, gpa, units, weights, label) => {
        var temp = Object.assign({}, this.state.classdict);
        const old_val = temp[classlabel];
        temp[classlabel] = [name, gpa, units, label, weights];
        var class_temp = this.state.allclasses.slice();
        if ((old_val) && !(old_val[0] == "")) { 
            class_temp = class_temp.filter(function(value, index, arr){return !(value == old_val[0]);})
        }
        class_temp.push(name);
        this.setState({ 
            classdict: temp,
            allclasses: class_temp
        });
    }

    getClassValues = (name) => { 
        for (const property in this.state.classdict) { 
            if (this.state.classdict[property][0] == name) { 
                return (this.state.classdict[property])
            }
        }
    }

    renderMajorViewer = () => { 
        return (
            <MajorViewer
                names = {this.state.allclasses}
                getValue = {this.getClassValues}
                calculateGPA = {this.calculateGPA}
            />
        )
    }

    renderSemester= (name, number) => { 
        return ( 
            <Semester 
                calculateGPA = {this.calculateGPA} 
                label = {name}
                number = {number}
                handleChange = {this.handleclassChanges}
            />
        )
    }
    toggleyear = (num, e) => { 
        var temp  = this.state.opened.slice(); 
        temp[num] = !temp[num]; 
        this.setState({ 
            opened: temp
        })
    }
    previousGPA = (event) => { 
        var temp = this.state.gpas.slice(); 
        temp[0] = Number(event.target.value); 
        this.setState({
            gpas: temp
        })
        this.OverallStats(temp, this.state.unit_tots, this.state.unit_relev_tots)
    }
    previousUnits = (event) => { 
        var temp = this.state.unit_relev_tots.slice();
        temp[0] = Number(event.target.value); 
        this.setState({
            unit_relev_tots: temp, 
            unit_tots: temp
        })
        this.OverallStats(this.state.gpas, temp, temp);
    }


    render() {
        const sys = this.state.system; 
        let layout;
        if (sys == "Semester") { 
            // The goal here is to have 2 per row
            const years = [0, 1, 2, 3]
            layout = years.map(num => 
            <div>
                <Button color = "primary" style = {{ "marginTop": "4px"}} onClick = {(e) => this.toggleyear(num, e) } > Year {num + 1} </Button> 
                    <Collapse isOpen = {this.state.opened[num]} > 
                    <Card> 
                    <CardBody> 
                        <div class = "row">
                            <div class = "col-md-6 semestersys"> 
                                {this.renderSemester("Fall " + (num +this.state.startyear), 2*num)}
                            </div> 
                            <div class = "col-md-6 semestersys"> 
                                {this.renderSemester("Spring " + (num + this.state.startyear + 1), 2*num + 1)}
                            </div>
                        </div> 
                    </CardBody>
                    </Card> 
                </Collapse>
            </div>
                )
        } else { 
            // The goal her is to have 3 per row 
            const years = [0, 1, 2, 3]
            layout = years.map(num => 
                <div>
                <Button color = "primary" style = {{ "marginTop": "4px"}} onClick = {(e) => this.toggleyear(num, e) } > Year {num + 1} </Button> 
                    <Collapse isOpen = {this.state.opened[num]} > 
                    <Card> 
                    <CardBody> 
                        <div class = "row">
                            <div class = "col-md-4 quarter"> 
                                {this.renderSemester("Fall " + (this.state.startyear + num), 3*num)}
                            </div> 
                            <div class = "col-md-4 quarter"> 
                                {this.renderSemester("Winter " + (this.state.startyear + num + 1), 3*num + 1)}
                            </div>
                            <div class = "col-md-4 quarter" > 
                                {this.renderSemester("Spring " + (this.state.startyear + num + 1), 3*num + 2)}
                            </div>
                        </div> 
                        </CardBody>
                    </Card> 
                </Collapse>
            </div>
                )
        }

        return ( 
            <div class = "container"> 
                <div class = "row titler"> 
                    <h3 > Academic Planner </h3>
                    <p> You can use this to plan out your academic career at any type of institution, 
                        specifically aimed at college students.</p> 
                    <div class = "listelem"> 
                        <ol> 
                            <li> Select your System and Starting School Year </li> 
                            <li> Adjust the Grading System (If a grade doesn't count towards GPA put "N/A") </li> 
                            <li> If you are part way to graduation you can put your current GPA and unit total and then 
                                adjust the semesters after (i.e if you are a first semester junior, 
                                you can input your GPA and units through sophomore year and then start in year 3). </li> 
                            <li> Input Your Grades (Checkbox indicates weighted class) </li> 
                        </ol>
                        If you want to see how I made this, check out <a href = "https://github.com/gargavi/reactschedule" target = "_blank"> my github </a>
                        and if you want to see other projects I've done check out  <a href = "https://www.avigarg.me" target = "_blank"> my website. </a>
                    </div> 
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
                        className = "startyear"
                        value = {this.state.startyear}
                        onChange = {(event) => {this.setState({ startyear: Number(event.target.value)})}}
                    /> 
                </div> 
                <div class = "row textalign"> 
                    <label style = {{paddingRight:'8px'}}> Current GPA:  </label> 
                    <input 
                        id = "previous gpa" 
                        name = "previous gpa"
                        type = "number" 
                        className = "startyear"
                        value = {this.state.gpas[0]}
                        onChange = {this.previousGPA}
                    />
                    <label style = {{ paddingLeft: '8px', paddingRight:'8px'}}> Current Total Units:  </label> 
                    <input 
                        id = "previous units" 
                        name = "previous units"
                        type = "number" 
                        min = "0"
                        className = "startyear"
                        value = {this.state.unit_relev_tots[0]}
                        onChange = {this.previousUnits}
                    />
                </div>
                <div class = "row textalign"> 
                    <label style = {{paddingRight:'8px'}}> Predicted GPA: </label> 
                    {this.state.cumm_gpa}
                    <label style = {{paddingRight:'8px', paddingLeft: '20px'}}> Predicted Total Units: </label> 
                    {this.state.cumm_unit}
                    <label style = {{paddingRight:'8px', paddingLeft: '20px'}}> Predicted Credited Units: </label> 
                    {this.state.cumm_relev_units} 

                </div>
                <div class = "row" > 
                    <div class = "col-md-1">
                        {this.renderGPAscale()}
                    </div> 
                    
                    <div class = "col-md-10 classesview">
                        {layout}
                    </div> 
                </div> 
                <div class = "divider">
                </div>
                <div> 
                    <div class = "row">
                        <div class = "col-md-3">
                            <h5> General Instructions</h5>
                            <p> I haven't perfected the update mechanism for the major section. 
                                It is still accurate, but if you make an update to any values in the 
                                main areas, you have to reselect the class in the major section for it 
                                to update (click on the empty class and then the original class). 
                                 </p> 
                        </div>
                        <div class = "col-md-6"> 
                            <div class = "semester"> 
                            <div class = "semesterheader"> 
                                Major 1: 
                            </div>
                                {this.renderMajorViewer()}
                            </div>
                        </div>
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
  