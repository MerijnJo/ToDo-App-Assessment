export default function About() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", lineHeight: "1.6" }}>
      <h2>About This Project</h2>
      <p>
        This application is a React-based TODO list built as an assessment project. 
        The primary goal is to demonstrate proficiency in React by implementing a multi-page application 
        that utilizes a custom global state management solution built entirely with React Context and Hooks.
      </p>

      <p>
        Core features include the ability to add, edit, check, and delete TODO items, all while ensuring 
        a mobile-friendly user interface.
      </p>
      
      <p>
        The motivation behind this project is to serve as a practical proof-of-concept for managing and sharing global 
        state across multiple components effectively, without relying on external state management libraries.
      </p>
    </div>
  );
}
