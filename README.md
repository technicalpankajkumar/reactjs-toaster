# Reactjs-Toaster

The React JS Toaster (reactjs-toaster) is lightweight JavaScript/TypeScript based Toast message library for showing Error , Success , Warning and Info  message in UI End.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Installation

Use the package manager npm to install reactjs-toaster.

```
npm i reactjs-toaster
```

### NOTE => Make sure in your Project configure with tailwind css! .

## Implementation Witn Global Configuration 
#### Make ToastIntitializer Component (`ToastIntitializer.tsx/jsx `) (`Step => 1`)

```

import { useEffect } from "react"
import { setGlobalAddToast, useToastHook } from "reactjs-toaster"

export const ToastIntitializer=()=>{
     const {addToast} = useToastHook()
     useEffect(()=>{
        setGlobalAddToast(addToast)
    }
    ,[addToast])

    return null
}
```

#### Main.tsx/jsx File Global Configuration (`Provider`) (`Step => 2`)
 1. Import ToastInitilizer.tsx/jsx and Wrap in Provider component.
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//toaster provider import here
import { ToastProvider } from 'reactjs-toaster'
import { ToastIntitializer } from './ToastInitializer.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
    <ToastProvider>
        <App />

       <ToastIntitializer/>
    </ToastProvider>
</StrictMode>)

```

## Uses
 #### 1. Import (`toast`) use any where in the your ReactJs  Project.
Example :- 

```
import { toast } from "reactjs-toaster"

export const Test=()=>{

const handleToastError=()=> toast("success","Data Submitted!",5000);

return (<>
     <button onClick={handleToastError} > Toast Appear </button>
</>)
```

## Full Documentation, How to use Reactjs Toaster (`Coming soon...`)

For the more information , How to use reactjs-toaster [Tap to go my Linkdin Account](https://www.linkedin.com/in/technicalpankajkumar) and Watch the [Video](https://www.youtube.com/technicalpankajkumar7) .


## Hi, I'm PankajKumar! 👋

### 🚀 About Me
👋 Hello! I am a passionate Full Stack Developer with nearly 2 years of hands-on experience in building dynamic and responsive web applications. My expertise spans a diverse range of technologies, including:

- #### Frontend Development: 
    Proficient in React.js, where I create intuitive user interfaces and seamless user experiences. I leverage modern JavaScript features and state management libraries to build scalable applications.

- #### Backend Development: 
    Skilled in Node.js and Express.js, I design and implement robust server-side applications and RESTful APIs. My experience with Nest.js allows me to build efficient and maintainable server-side applications using TypeScript.

-  #### Database Management: 
    I have a solid understanding of both MongoDB and MySQL, enabling me to design and manage databases that support complex data structures and relationships. I am adept at writing optimized queries and ensuring data integrity.

-  #### Full Stack Integration: 
    I excel at integrating frontend and backend technologies, ensuring smooth data flow and functionality across the entire application stack. My experience with Next.js allows me to build server-rendered React applications, enhancing performance.

I am committed to writing clean, maintainable code and following best practices in software development. I thrive in collaborative environments and enjoy working with cross-functional teams to deliver high-quality software solutions.

I am always eager to learn new technologies and improve my skills, and I am excited about the opportunity to contribute to innovative projects that make a difference.


### 🛠 Skills
Javascript, HTML, CSS, React JS , Node JS , Express JS, Nest JS , Next JS, MongoDB, MySQL , Git , Jira , PHP with Laravel etc.

### Authors
[@PankajKumar](https://www.linkedin.com/in/technicalpankajkumar)
#### 🔗 Social Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://technicalpankajkumar.github.io/portfolio.github.io/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/technicalpankajkumar)

## License

[ISC]()


