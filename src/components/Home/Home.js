export const Home = ({toggle, setToggle}) => {
    return <section 
    className="component_container"
    onClick={()=>{setToggle(!toggle)}}>
    Hello World!
    </section>
}