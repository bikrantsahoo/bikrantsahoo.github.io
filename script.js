// Initialize terminal
const terminal = new Terminal({
    cursorBlink: true,
    rows: 20,
    cols: 80,
    theme: {
      background: "#800080", // Purple background
      foreground: "#00ff00", // Green text color
    },
  });
  
  // Attach terminal to the DOM
  const container = document.getElementById("terminal-container");
  terminal.open(container);
  
  // Simulate terminal behavior
  terminal.writeln("Welcome to Bikrant's Terminal!");
  terminal.writeln("Type 'help' to see available commands.\n");
  
  const commands = {
    help: "Available commands: \nhelp - Display this help message\nabout - Learn more about me\nclear - Clear the terminal",
    about: "Hello! I'm Bikrant Sahoo, a software developer passionate about technology and open-source!",
  };
  
  // Function to display the prompt
  terminal.prompt = () => {
    terminal.write("\r\n> ");
  };
  
  // Display the initial prompt
  terminal.prompt();
  
  // Listen for key presses
  terminal.onKey(({ key, domEvent }) => {
    const charCode = domEvent.keyCode || domEvent.which;
  
    if (charCode === 13) {  // Enter key
      // Get the current line of input
      const input = terminal.buffer.active.getLine(terminal.buffer.active.cursorY - 1).translateToString().trim();
      const command = input.split(">")[1]?.trim();
  
      terminal.write("\r\n");
  
      // Execute the command
      if (commands[command]) {
        terminal.writeln(commands[command]);
      } else if (command === "clear") {
        terminal.clear();  // Clears the terminal screen
      } else {
        terminal.writeln(`Command not found: ${command}`);
      }
      terminal.prompt();
    } else if (charCode === 8) {  // Backspace key
      // Handle backspace properly
      if (terminal._core.buffer.x > 2) {
        terminal.write("\b \b");
      }
    } else {
      // For any other key, just print it
      terminal.write(key);
    }
  });
  