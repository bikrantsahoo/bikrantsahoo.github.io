// Initialize terminal
const terminal = new Terminal({
    cursorBlink: true,
    rows: 20,
    cols: 80,
    theme: {
      background: "#1e1e1e",
      foreground: "#00ff00",
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
  
  terminal.prompt = () => {
    terminal.write("\r\n> ");
  };
  
  terminal.prompt();
  
  terminal.onKey(({ key, domEvent }) => {
    const charCode = domEvent.keyCode || domEvent.which;
    if (charCode === 13) {
      // Enter key
      const input = terminal.buffer.active.getLine(terminal.buffer.active.cursorY - 1).translateToString().trim();
      const command = input.split(">")[1]?.trim();
      terminal.write("\r\n");
  
      if (commands[command]) {
        terminal.writeln(commands[command]);
      } else if (command === "clear") {
        terminal.clear();
      } else {
        terminal.writeln(`Command not found: ${command}`);
      }
      terminal.prompt();
    } else if (charCode === 8) {
      // Backspace key
      if (terminal._core.buffer.x > 2) {
        terminal.write("\b \b");
      }
    } else {
      terminal.write(key);
    }
  });
  