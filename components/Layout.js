import Footer from "./Footer";


//Layout({children}) - affects all the children within the 'div', but instead of div we are using 'Layout' as a component
export default function Layout({children}) {
    return (
        <div>
            <div className="p-5">
                {children}
            </div>
            <Footer />
        </div>
    );
}