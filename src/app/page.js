
import Main from "@/components/home/Main";
import Contact from "@/components/home/Contact";
import Events from "@/components/home/Events";

export default function MyApp() {
    return(
        <div className="bg-black text-white">
            <Main />
            <Events />
            <Contact />
        </div>
    );
  }