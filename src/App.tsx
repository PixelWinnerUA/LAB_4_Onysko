import {useState} from "react";
import {getAlphabet} from "./helpers/getAlphabet.helper.ts";
import {useFormik} from "formik";
import {AlphabetSizes} from "./types";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {getSValue} from "./helpers/getSValue.helper.ts";
import {getLValue} from "./helpers/getLValue.helper.ts";

type FormikValues = {
    p: number,
    v: number,
    t: number,
    s: number,
    a: AlphabetSizes,
    l: number,
}

function App() {
    const [password, setPassword] = useState("");
    const initialValues: FormikValues = {
        p: 0,
        v: 0,
        t: 0,
        s: 0,
        a: 52,
        l: 0,
    }

    const formikHook = useFormik({
        initialValues,
        onSubmit: () => {
        }
    })

    const handelCalculateS = () => {
        const {v, t, p} = formikHook.values

        formikHook.setFieldValue("s", getSValue({v, t, p}))
    }

    const handleCalculateL = () => {
        const {s, a} = formikHook.values

        formikHook.setFieldValue("l", getLValue({s, a}))
    }

    const handleGeneratePassword = () => {
        const {l, a} = formikHook.values

        const charset = getAlphabet(a);
        let newPassword = '';

        for (let i = 0; i < l; i++) {
            const index = Math.floor(Math.random() * a);
            newPassword += charset[index];
        }

        setPassword(newPassword);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "8px", alignItems: "center"}}>
            <Typography variant="h3">Password Generator</Typography>

            <TextField type="number" name="p" label="P Value" value={formikHook.values.p}
                       onChange={formikHook.handleChange}
                       placeholder="Enter P"/>
            <TextField type="number" name="v" label="V Value" value={formikHook.values.v}
                       onChange={formikHook.handleChange}
                       placeholder="Enter V"/>
            <TextField type="number" name="t" label="T Value" value={formikHook.values.t}
                       onChange={formikHook.handleChange}
                       placeholder="Enter T"/>

            <Button variant="contained" onClick={handelCalculateS}>Calculate S</Button>

            <Typography variant="body1">S: {formikHook.values.s}</Typography>


            <FormControl>
                <FormLabel>Alphabet length</FormLabel>
                <RadioGroup
                    row
                    name="a"
                    value={formikHook.values.a}
                    onChange={formikHook.handleChange}
                >
                    <FormControlLabel value={52} control={<Radio/>} label={52}/>
                    <FormControlLabel value={62} control={<Radio/>} label={62}/>
                    <FormControlLabel value={85} control={<Radio/>} label={85}/>
                </RadioGroup>
            </FormControl>


            <Button disabled={!formikHook.values.s} variant="contained" onClick={handleCalculateL}>Calculate L</Button>
            <Typography variant="body1">L: {formikHook.values.l}</Typography>

            <Button  disabled={!formikHook.values.l} variant="contained" onClick={handleGeneratePassword}>Generate Password</Button>
            <Typography variant="body1">Password: {password}</Typography>
        </Box>
    );
}

export default App
