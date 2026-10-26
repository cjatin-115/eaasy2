// Complete Computer Networks Practical Exam Data

export const PREREQUISITES_DATA = {
  title: "1. Prerequisites: Software and System Requirements",
  tools: [
    {
      name: "Python 3 (3.12 or 3.13)",
      badge: "Required",
      description: "Install Python from the official website. Tick 'Add Python to PATH' during installation.",
      command: "python --version",
      purpose: "Run all Python practical scripts locally."
    },
    {
      name: "Code Editor",
      badge: "Recommended",
      description: "VS Code, IDLE (bundled with Python), or Notepad with terminal.",
      command: "code .",
      purpose: "Writing, editing, and reviewing Python files."
    },
    {
      name: "Windows Terminal (PowerShell / CMD)",
      badge: "Built-in",
      description: "Essential for ping, tracert, netstat, nslookup, and running client/server scripts in parallel terminals.",
      command: "powershell",
      purpose: "Running diagnostic commands and executing multi-terminal network scripts."
    },
    {
      name: "Cisco Packet Tracer",
      badge: "Optional",
      description: "Simulator for demonstrating networking topologies, switches, routers, and IP configuration visually.",
      command: "PacketTracer",
      purpose: "Topology simulation if requested by the examiner."
    }
  ],
  environmentTable: [
    { env: "Windows PowerShell / CMD", status: "Recommended", capability: "All algorithms locally, OS commands, socket programming, FTP client-server" },
    { env: "Programiz Online Compiler", status: "Basic", capability: "Basic algorithm programs: 1–5 (No sockets, OS tools, or multiple terminals)" },
    { env: "Online Python", status: "Basic", capability: "Basic Python programs and simple simulations" },
    { env: "Google Colab", status: "Restricted", capability: "Basic simulations; sockets, FTP, and OS network commands may be restricted" }
  ],
  setupSteps: [
    "1. Open PowerShell and verify Python: `python --version`",
    "2. Create a lab directory: `mkdir CN-Practicals; cd CN-Practicals`",
    "3. Save each program as a separate `.py` file, then run with `python filename.py`",
    "4. For client-server programs (FTP / Socket File Transfer), open TWO terminal windows: start the server in terminal 1, then run the client in terminal 2."
  ]
};

export const PRACTICALS_DATA = [
  {
    id: 1,
    practicalNum: "Practical 1",
    title: "Leaky Bucket Algorithm for Congestion Control",
    layer: "Network Layer / Traffic Shaping",
    category: "Traffic Shaping & Congestion Control",
    tags: ["Congestion Control", "Traffic Shaper", "Buffer Management"],
    theory: `The Leaky Bucket Algorithm is a congestion-control and traffic-shaping technique. It allows packets to leave a network at a controlled, approximately constant rate, even if they arrive in bursts.

Imagine a bucket with a small hole at its bottom:
• Incoming packets are added to the bucket.
• Packets leave at a fixed, uniform rate.
• If the bucket becomes full, additional packets are discarded (overflow).
• This prevents sudden bursts of traffic from overwhelming the network and causing congestion at downstream routers.`,
    working: [
      "Step 1: Define a fixed bucket capacity (e.g. 10) and constant output leak rate per round (e.g. 3).",
      "Step 2: Read packet burst sizes from user input.",
      "Step 3: For each incoming packet, check if bucket + packet <= bucket_size.",
      "Step 4: If space permits, packet is accepted; otherwise, packet is dropped due to overflow.",
      "Step 5: Transmit packets at fixed rate: sent = min(bucket, output_rate), decrement bucket by sent.",
      "Step 6: Once all incoming bursts finish, continue leaking the remaining bucket contents until empty."
    ],
    // EXACT CODE FROM EXPERIMENT 1 - DO NOT CHANGE
    code: `bucket_size = 10
output_rate = 3
bucket = 0

packets = list(map(int, input("Enter packet sizes: ").split()))

for packet in packets:
    print("\\nIncoming packet:", packet)

    if bucket + packet <= bucket_size:
        bucket += packet
        print("Packet accepted")
    else:
        print("Packet dropped")

    sent = min(bucket, output_rate)
    bucket -= sent

    print("Packets sent:", sent)
    print("Packets remaining:", bucket)

while bucket > 0:
    sent = min(bucket, output_rate)
    bucket -= sent
    print("\\nPackets sent:", sent)
    print("Packets remaining:", bucket)`,
    sampleInput: "Enter packet sizes: 5 8 3",
    sampleOutput: `Enter packet sizes: 5 8 3

Incoming packet: 5
Packet accepted
Packets sent: 3
Packets remaining: 2

Incoming packet: 8
Packet accepted
Packets sent: 3
Packets remaining: 7

Incoming packet: 3
Packet dropped
Packets sent: 3
Packets remaining: 4

Packets sent: 3
Packets remaining: 1

Packets sent: 1
Packets remaining: 0`,
    viva: [
      {
        q: "What is network congestion?",
        a: "Congestion is a state where the demand on network resources exceeds capacity, causing packet queuing delays, buffer overflows, and packet drops."
      },
      {
        q: "Why are packets dropped in the Leaky Bucket algorithm?",
        a: "Packets are dropped when the bucket (buffer) is full and cannot accommodate newly arrived burst packets."
      },
      {
        q: "What is the output rate?",
        a: "The maximum amount of packets/bytes allowed to be transmitted per round or unit of time, creating a smooth constant outflow."
      },
      {
        q: "Does the basic leaky bucket preserve bursts?",
        a: "No, it smooths out traffic to a strictly uniform rate. If you need to allow controlled bursts, Token Bucket is preferred."
      },
      {
        q: "What is the key difference between Leaky Bucket and Token Bucket?",
        a: "Leaky Bucket outputs at a strict constant rate and drops packets on overflow; Token Bucket accumulates tokens and allows bursty transmission up to the available token limit."
      }
    ]
  },

  {
    id: 2,
    practicalNum: "Practical 2",
    title: "Stop-and-Wait Protocol (Flow Control)",
    layer: "Data Link Layer / Transport Layer",
    category: "Flow & Error Control",
    tags: ["ARQ", "Reliable Transfer", "Stop-and-Wait"],
    theory: `Stop-and-Wait is a fundamental flow-control and reliable data-transfer protocol. The sender transmits one frame at a time and stops, waiting for an acknowledgement (ACK) before transmitting the next frame.

Working Principles:
1. Sender sends frame i.
2. Receiver receives frame i and returns ACK i.
3. Sender transmits frame i+1 only after receiving ACK i.
4. If the frame or ACK is lost/damaged, the sender retransmits after a timeout (Stop-and-Wait ARQ).`,
    working: [
      "Step 1: Input total number of frames from user.",
      "Step 2: Loop through frames from 1 to n.",
      "Step 3: Sender transmits frame i.",
      "Step 4: Prompt if ACK was received ('y' or 'n').",
      "Step 5: If ACK is 'n', sender retransmits frame i until ACK 'y' is received.",
      "Step 6: Move to the next frame and conclude when all frames are acknowledged."
    ],
    // EXACT CODE FROM EXPERIMENT 2 - DO NOT CHANGE
    code: `n = int(input("Enter number of frames: "))

for i in range(1, n + 1):
    print("\\nSending frame:", i)
    ack = input("ACK received? (y/n): ").lower()

    while ack != "y":
        print("Retransmitting frame:", i)
        ack = input("ACK received? (y/n): ").lower()

    print("Frame", i, "received successfully")

print("All frames transmitted")`,
    sampleInput: `Enter number of frames: 3
ACK received? (y/n): y
ACK received? (y/n): n
ACK received? (y/n): y
ACK received? (y/n): y`,
    sampleOutput: `Enter number of frames: 3

Sending frame: 1
ACK received? (y/n): y
Frame 1 received successfully

Sending frame: 2
ACK received? (y/n): n
Retransmitting frame: 2
ACK received? (y/n): y
Frame 2 received successfully

Sending frame: 3
ACK received? (y/n): y
Frame 3 received successfully

All frames transmitted`,
    viva: [
      {
        q: "What is an ACK?",
        a: "An Acknowledgement (ACK) is a control message sent by the receiver confirming successful receipt of a frame."
      },
      {
        q: "What is ARQ?",
        a: "Automatic Repeat reQuest (ARQ) is an error-control mechanism where the sender automatically retransmits frames upon timeout or negative acknowledgment."
      },
      {
        q: "What is the main drawback of Stop-and-Wait?",
        a: "Very low channel efficiency (bandwidth utilization) on high-latency or long-distance links because the sender remains idle waiting for round-trip propagation."
      },
      {
        q: "How does Sliding Window improve on Stop-and-Wait?",
        a: "Sliding Window allows multiple frames (up to window size W) to be in transit simultaneously without waiting for individual ACKs."
      }
    ]
  },

  {
    id: 3,
    practicalNum: "Practical 3",
    title: "Sliding Window Protocol",
    layer: "Data Link Layer / Transport Layer",
    category: "Pipelining & Flow Control",
    tags: ["Pipelined ARQ", "Window Size", "Cumulative ACK"],
    theory: `The Sliding Window Protocol allows a sender to transmit multiple frames before receiving acknowledgements for all of them.

Key Concepts:
• Window size (W): The maximum number of outstanding, unacknowledged frames permitted at any time.
• Transmission Pipelining: Keeps the communication link busy, substantially improving throughput compared to Stop-and-Wait.
• Sliding Mechanism: As ACKs arrive for earlier frames, the window boundary advances forward to permit transmission of subsequent frames.`,
    working: [
      "Step 1: Input total number of frames (n) and window size (w).",
      "Step 2: Set start = 1 representing the left edge of the window.",
      "Step 3: Calculate end = min(start + w - 1, n) as the right edge.",
      "Step 4: Transmit all frames from start to end.",
      "Step 5: Ask user for the last cumulative ACK received.",
      "Step 6: If ACK is valid, slide window forward (start = ack + 1); repeat until all frames are acknowledged."
    ],
    // EXACT CODE FROM EXPERIMENT 3 - DO NOT CHANGE
    code: `n = int(input("Enter total frames: "))
w = int(input("Enter window size: "))

if n <= 0 or w <= 0:
    print("Enter positive numbers")
else:
    start = 1

    while start <= n:
        end = min(start + w - 1, n)

        print("\\nSending frames:")
        for i in range(start, end + 1):
            print("Frame", i, "sent")

        ack = int(input("Enter last ACK received: "))

        if start <= ack <= end:
            start = ack + 1
        else:
            print("Invalid ACK. Try again")

    print("All frames acknowledged")`,
    sampleInput: `Enter total frames: 5
Enter window size: 3
Enter last ACK received: 3
Enter last ACK received: 5`,
    sampleOutput: `Enter total frames: 5
Enter window size: 3

Sending frames:
Frame 1 sent
Frame 2 sent
Frame 3 sent
Enter last ACK received: 3

Sending frames:
Frame 4 sent
Frame 5 sent
Enter last ACK received: 5

All frames acknowledged`,
    viva: [
      {
        q: "What does window size represent?",
        a: "The maximum number of frames that the sender can transmit without receiving an acknowledgement."
      },
      {
        q: "What are the two major Sliding Window ARQ protocols?",
        a: "Go-Back-N (GBN) and Selective Repeat (SR)."
      },
      {
        q: "What is Go-Back-N?",
        a: "If a frame is lost or corrupted, the receiver discards all subsequent out-of-order frames, and sender retransmits the erroneous frame plus all subsequent frames in the window."
      },
      {
        q: "What is Selective Repeat?",
        a: "The receiver has buffers to accept out-of-order frames, and the sender retransmits only the specific lost or damaged frames."
      },
      {
        q: "Why is Sliding Window much more efficient than Stop-and-Wait?",
        a: "It pipelines packet transmission, filling the channel pipe so sender is not kept idle during round-trip propagation time."
      }
    ]
  },

  {
    id: 4,
    practicalNum: "Practical 4",
    title: "Framing Using Byte Stuffing",
    layer: "Data Link Layer",
    category: "Data Framing & Delineation",
    tags: ["Byte Stuffing", "Character-Oriented", "Frame Delimiter"],
    theory: `Framing is a Data Link Layer function that divides a raw stream of physical-layer bits into discrete, identifiable units called frames.

Framing Methods:
1. Character Count: Specifies frame length in the header.
2. Byte Stuffing (Character-oriented): Special flag bytes (e.g., 'F') delimit frame start and end. If flag or escape ('E') occurs in payload, an escape byte ('E') is stuffed before it.
3. Bit Stuffing (Bit-oriented): A zero is stuffed after five consecutive 1s (01111110 flag).
4. Physical Layer Coding Violations: Reserved illegal hardware signals indicate boundaries.

Byte Stuffing Rule:
• Frame boundary = 'F' (FLAG)
• Escape character = 'E' (ESC)
• When data contains 'F' or 'E', prepend 'E' -> 'EF', 'EE'.`,
    working: [
      "Step 1: Set FLAG = 'F' and ESC = 'E'.",
      "Step 2: Read data string from user.",
      "Step 3: Stuffer loop: for every character, if ch == FLAG or ch == ESC, prepend ESC.",
      "Step 4: Transmit framed string as FLAG + stuffed_payload + FLAG.",
      "Step 5: Receiver de-stuffing: strip start and end FLAGs.",
      "Step 6: Scan characters: when ESC is encountered, skip ESC and take next character verbatim."
    ],
    // EXACT CODE FROM EXPERIMENT 4 - DO NOT CHANGE
    code: `FLAG = "F"
ESC = "E"

data = input("Enter data: ")
stuffed = ""

for ch in data:
    if ch == FLAG or ch == ESC:
        stuffed += ESC
    stuffed += ch

frame = FLAG + stuffed + FLAG

print("Original data:", data)
print("Transmitted frame:", frame)

received = frame[1:-1]
result = ""
i = 0

while i < len(received):
    if received[i] == ESC:
        i += 1

    result += received[i]
    i += 1

print("Destuffed data:", result)`,
    sampleInput: "Enter data: ABFC",
    sampleOutput: `Enter data: ABFC
Original data: ABFC
Transmitted frame: FABEFCF
Destuffed data: ABFC`,
    viva: [
      {
        q: "Why is framing needed in the Data Link Layer?",
        a: "To divide the continuous stream of bits from the physical layer into recognizable blocks, enabling error detection, synchronization, and addressing."
      },
      {
        q: "What is byte stuffing?",
        a: "Inserting an escape byte (ESC) before any delimiter flag or escape character present inside user data to avoid premature frame termination."
      },
      {
        q: "What is bit stuffing?",
        a: "Inserting an extra '0' bit after every five consecutive '1' bits in payload data to ensure the flag pattern (01111110) never occurs in the data."
      },
      {
        q: "What is character count framing and its drawback?",
        a: "The header contains the total frame character count. If the count field is corrupted, the receiver loses frame synchronization completely."
      }
    ]
  },

  {
    id: 5,
    practicalNum: "Practical 5",
    title: "Distance Vector Routing Algorithm",
    layer: "Network Layer",
    category: "Intra-Domain Routing",
    tags: ["Bellman-Ford", "Distance Vector", "RIP", "Routing Table"],
    theory: `Distance Vector Routing is a distributed routing algorithm where each node maintains a vector of distances (costs) to every known destination in the network.

Routers periodically advertise their distance vectors to immediate neighbors and update their own routing tables using the Bellman-Ford equation:
  D_x(y) = min_v { c(x,v) + D_v(y) }

Where:
• D_x(y): estimated minimum cost from router x to destination y
• c(x,v): direct link cost from x to neighbor v
• D_v(y): neighbor v's estimated cost to reach y

Updates repeat iteratively until routing tables stabilize (convergence).`,
    working: [
      "Step 1: Input number of routers n and cost adjacency matrix (use 999 for non-adjacent nodes).",
      "Step 2: Initialize distance matrix dist[i][j] = cost[i][j] and next_hop[i][j] = j if connected.",
      "Step 3: Run relaxation loops up to (n-1) times across all triplets (i, j, k).",
      "Step 4: If dist[i][k] + dist[k][j] < dist[i][j], update dist[i][j] and set next_hop[i][j] = next_hop[i][k].",
      "Step 5: If no cost changes occur in an iteration, tables have converged; break early.",
      "Step 6: Display routing table for each router showing Destination, Minimum Cost, and Next Hop."
    ],
    // EXACT CODE FROM EXPERIMENT 5 - DO NOT CHANGE
    code: `n = int(input("Enter number of routers: "))

print("Enter cost matrix (999 means no direct link):")
cost = [list(map(int, input().split())) for _ in range(n)]

if len(cost) != n or any(len(row) != n for row in cost):
    raise ValueError("Enter a valid square cost matrix")

dist = [row[:] for row in cost]
next_hop = [[-1] * n for _ in range(n)]

for i in range(n):
    dist[i][i] = 0

    for j in range(n):
        if i != j and cost[i][j] < 999:
            next_hop[i][j] = j

for _ in range(n - 1):
    changed = False

    for i in range(n):
        for j in range(n):
            for k in range(n):
                if dist[i][k] >= 999 or dist[k][j] >= 999:
                    continue

                new_cost = dist[i][k] + dist[k][j]

                if new_cost < dist[i][j]:
                    dist[i][j] = new_cost
                    next_hop[i][j] = next_hop[i][k]
                    changed = True

    if not changed:
        break

for i in range(n):
    print("\\nRouter", i)
    print("Destination | Cost | Next Hop")

    for j in range(n):
        print(j, "|", dist[i][j], "|", next_hop[i][j])`,
    sampleInput: `Enter number of routers: 4
Enter cost matrix (999 means no direct link):
0 2 7 999
2 0 1 5
7 1 0 2
999 5 2 0`,
    sampleOutput: `Router 0
Destination | Cost | Next Hop
0 | 0 | -1
1 | 2 | 1
2 | 3 | 1
3 | 5 | 1

Router 1
Destination | Cost | Next Hop
0 | 2 | 0
1 | 0 | -1
2 | 1 | 2
3 | 3 | 2

Router 2
Destination | Cost | Next Hop
0 | 3 | 1
1 | 1 | 1
2 | 0 | -1
3 | 2 | 3

Router 3
Destination | Cost | Next Hop
0 | 5 | 1
1 | 3 | 2
2 | 2 | 2
3 | 0 | -1`,
    viva: [
      {
        q: "Which mathematical equation underlies Distance Vector Routing?",
        a: "The Bellman-Ford algorithm: D_x(y) = min_v { c(x,v) + D_v(y) }."
      },
      {
        q: "What is network convergence?",
        a: "The state where all routers across the network agree on the topology and routing tables cease to change."
      },
      {
        q: "What is the Count-to-Infinity problem?",
        a: "A routing loop phenomenon where link breakage causes routing updates to continuously increment cost estimates toward infinity before discovering the break."
      },
      {
        q: "How can Count-to-Infinity be mitigated?",
        a: "Using Split Horizon, Poison Reverse, and setting maximum hop limit (e.g., 15 hops in RIP, with 16 as infinity)."
      },
      {
        q: "Name a real-world protocol based on Distance Vector.",
        a: "Routing Information Protocol (RIP)."
      }
    ]
  },

  {
    id: 6,
    practicalNum: "Practical 6",
    title: "Socket Primitives and Host Reachability (Ping Simulation)",
    layer: "Transport / Application Layer",
    category: "Socket Programming & Connectivity",
    tags: ["Socket API", "TCP Connect", "DNS Resolution", "Ping"],
    theory: `A socket is an endpoint abstraction for communication between two networked processes across an IP network.

Core Socket Primitives:
• socket(): Creates an endpoint (AF_INET for IPv4, SOCK_STREAM for TCP, SOCK_DGRAM for UDP).
• bind(): Associates the socket with a local IP address and port number.
• listen(): Puts a TCP socket in passive listening mode waiting for client requests.
• accept(): Blocks and accepts an incoming client connection, returning a new socket.
• connect(): Initiates a 3-way handshake to establish a TCP connection to a server.
• send() / recv(): Transmits and receives data bytes over connected sockets.
• close(): Deallocates socket resources and terminates the connection.

Host Reachability Check:
This program tests reachability by resolving the domain to an IP address and attempting a TCP connection handshake on port 80 with a timeout.`,
    working: [
      "Step 1: Input destination hostname (e.g. google.com).",
      "Step 2: Resolve hostname to IPv4 using socket.gethostbyname().",
      "Step 3: Create a TCP streaming socket: socket.socket(AF_INET, SOCK_STREAM).",
      "Step 4: Set connection timeout to 5 seconds to avoid infinite blocking.",
      "Step 5: Execute connect_ex((ip, 80)); return value 0 indicates successful handshake.",
      "Step 6: Close socket and print reachability status."
    ],
    // EXACT CODE FROM EXPERIMENT 6 - DO NOT CHANGE
    code: `import socket

host = input("Enter hostname (e.g. google.com): ")

try:
    ip = socket.gethostbyname(host)
    print("IP Address:", ip)

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(5)

    result = s.connect_ex((ip, 80))
    s.close()

    if result == 0:
        print("Host is reachable on port 80")
    else:
        print("Connection failed or port 80 is blocked")

except socket.gaierror:
    print("Hostname could not be resolved")

except OSError as e:
    print("Network error:", e)`,
    sampleInput: "Enter hostname (e.g. google.com): google.com",
    sampleOutput: `Enter hostname (e.g. google.com): google.com
IP Address: 142.250.190.46
Host is reachable on port 80`,
    viva: [
      {
        q: "What is a network socket?",
        a: "A socket is an endpoint for sending and receiving data across a network, defined by an IP address and port number."
      },
      {
        q: "What is the typical sequence of socket primitives on a TCP server?",
        a: "socket() -> bind() -> listen() -> accept() -> recv() / send() -> close()."
      },
      {
        q: "What is the typical sequence of socket primitives on a TCP client?",
        a: "socket() -> connect() -> send() / recv() -> close()."
      },
      {
        q: "What does connect_ex() return?",
        a: "It returns 0 if the connection succeeded, or an errno error code if it failed, without raising an exception."
      },
      {
        q: "How does ICMP ping differ from TCP ping?",
        a: "Traditional ping uses raw ICMP Echo Request/Reply at the Network Layer. TCP ping tests whether a specific port (e.g. 80) is open and accepting TCP handshakes."
      }
    ]
  },

  {
    id: 7,
    practicalNum: "Practical 7",
    title: "IP Protocol and Local IP Address Configuration",
    layer: "Network Layer",
    category: "Network Diagnostics & Addressing",
    tags: ["IPv4 / IPv6", "ipconfig", "Subnet Mask", "Default Gateway"],
    theory: `The Internet Protocol (IP) provides logical addressing, packet formatting, and datagram routing across interconnected computer networks.

Key Concepts:
• IPv4: 32-bit address (e.g. 192.168.1.15), providing ~4.3 billion unique addresses.
• IPv6: 128-bit hexadecimal address (e.g. 2001:0db8::1) overcoming address exhaustion.
• Connectionless & Best-Effort: IP does not guarantee delivery, order, or error recovery; transport protocols (TCP) handle reliability.
• Key Parameters:
  - IP Address: Identifies host uniquely on the network.
  - Subnet Mask: Delineates the Network ID portion from Host ID portion (e.g. 255.255.255.0).
  - Default Gateway: Next-hop router IP used to reach destinations beyond the local subnet.
  - DNS Server: Resolves human-readable domain names into IP addresses.`,
    working: [
      "Step 1: Retrieve local machine hostname using socket.gethostname().",
      "Step 2: Create a dummy UDP socket to an external routing address to detect active outbound IPv4.",
      "Step 3: Resolve all configured IP addresses via socket.getaddrinfo().",
      "Step 4: Check operating system platform (Windows / Linux / macOS).",
      "Step 5: Run native OS configuration command ('ipconfig /all' on Windows, 'ip addr' on Linux) via subprocess.",
      "Step 6: Display parsed network adapter details including subnet mask, MAC address, and gateway."
    ],
    // EXACT CODE FROM EXPERIMENT 7 - DO NOT CHANGE
    code: `import socket
import platform
import subprocess

print("Hostname:", socket.gethostname())

s = None

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("192.0.2.1", 80))
    print("Local IPv4 address:", s.getsockname()[0])
except OSError:
    print("Could not determine local IPv4 address")
finally:
    if s:
        s.close()

try:
    print("\\nResolved IP addresses:")
    addresses = socket.getaddrinfo(socket.gethostname(), None)

    for ip in sorted(set(item[4][0] for item in addresses)):
        print(ip)

except socket.gaierror as e:
    print("Address lookup failed:", e)

system = platform.system()

if system == "Windows":
    command = ["ipconfig", "/all"]
elif system == "Darwin":
    command = ["ifconfig"]
else:
    command = ["ip", "addr"]

try:
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        timeout=15
    )

    print("\\nNetwork configuration:")
    print(result.stdout)

    if result.returncode != 0:
        print(result.stderr)

except FileNotFoundError:
    print("Network configuration command is unavailable")
except subprocess.TimeoutExpired:
    print("Command timed out")`,
    sampleInput: "(None - queries system automatically)",
    sampleOutput: `Hostname: DESKTOP-LAB
Local IPv4 address: 192.168.1.15

Resolved IP addresses:
192.168.1.15

Network configuration:
Windows IP Configuration
   Host Name . . . . . . . . . . . . : DESKTOP-LAB
   Primary Dns Suffix  . . . . . . . : 

Wireless LAN adapter Wi-Fi:
   IPv4 Address. . . . . . : 192.168.1.15
   Subnet Mask . . . . . . : 255.255.255.0
   Default Gateway . . . . : 192.168.1.1`,
    viva: [
      {
        q: "What is the difference between IPv4 and IPv6?",
        a: "IPv4 uses 32-bit addresses (~4.3 billion total) in dotted decimal format; IPv6 uses 128-bit addresses in hexadecimal colon-separated format, providing practically inexhaustible addresses."
      },
      {
        q: "What is the function of a subnet mask?",
        a: "It separates an IP address into Network Prefix (bits set to 1) and Host Identifier (bits set to 0), determining whether a target is local or remote."
      },
      {
        q: "What is a Default Gateway?",
        a: "The IP address of the local router interface that forwards packets destined for networks outside the local subnet."
      },
      {
        q: "What does DNS stand for and what is its role?",
        a: "Domain Name System; it resolves human-friendly hostnames (like google.com) into numerical IP addresses needed for routing."
      }
    ]
  },

  {
    id: 8,
    practicalNum: "Practical 8",
    title: "Socket Programming and Traceroute Implementation",
    layer: "Network Layer",
    category: "Path Discovery & Routing Diagnostics",
    tags: ["Traceroute", "tracert", "TTL", "ICMP Time Exceeded"],
    theory: `Traceroute determines the exact hop-by-hop route packets travel from your computer to a destination across routers.

How TTL (Time To Live) Works:
1. Sender dispatches probes with TTL = 1.
2. The 1st router decrements TTL to 0, drops the packet, and returns an ICMP 'Time Exceeded' message revealing its IP.
3. Sender increases TTL = 2 to discover the 2nd router.
4. Process repeats with TTL = 3, 4, 5... until destination responds with Echo Reply or maximum hop limit (e.g. 15 or 30) is reached.

Windows uses 'tracert' (ICMP probes); Linux/macOS uses 'traceroute' (UDP/ICMP probes).`,
    working: [
      "Step 1: Input destination host name or IP address from user.",
      "Step 2: Resolve hostname to IP using socket.gethostbyname().",
      "Step 3: Execute Windows tracert command with options: -d (do not resolve IP to names for fast output), -h 15 (max 15 hops), -w 1000 (1 sec timeout).",
      "Step 4: Capture standard output and error using subprocess.run().",
      "Step 5: Display hop number, round-trip times (RTTs), and router IP addresses.",
      "Step 6: Handle timeouts or unreachable host exceptions cleanly."
    ],
    // EXACT CODE FROM EXPERIMENT 8 - DO NOT CHANGE
    code: `import socket
import subprocess

host = input("Enter destination hostname: ").strip()

if not host:
    print("Please enter a hostname.")
else:
    try:
        ip = socket.gethostbyname(host)
        print(f"Tracing route to {host} ({ip})")
        print("Please wait...\\n")

        result = subprocess.run(
            ["tracert", "-d", "-h", "15", "-w", "1000", host],
            capture_output=True,
            text=True,
            timeout=40,
            check=False
        )

        print(result.stdout)

        if result.stderr:
            print("Error:", result.stderr)

    except socket.gaierror:
        print("DNS resolution failed. Check the hostname.")

    except subprocess.TimeoutExpired:
        print("Traceroute timed out. Try again.")

    except FileNotFoundError:
        print("Windows tracert command was not found.")

    except OSError as e:
        print("Error:", e)

print("Program finished.")`,
    sampleInput: "Enter destination hostname: 8.8.8.8",
    sampleOutput: `Enter destination hostname: 8.8.8.8
Tracing route to 8.8.8.8 (8.8.8.8)
Please wait...

Tracing route to 8.8.8.8 over a maximum of 15 hops:

  1     2 ms     1 ms     1 ms  192.168.1.1
  2    11 ms    10 ms    10 ms  10.20.0.1
  3    14 ms    13 ms    13 ms  172.16.4.5
  4    15 ms    14 ms    14 ms  8.8.8.8

Trace complete.
Program finished.`,
    viva: [
      {
        q: "What is TTL in the IPv4 header and what is its purpose?",
        a: "Time To Live is an 8-bit counter decremented by each router. It prevents packets from looping infinitely in case of routing loops."
      },
      {
        q: "Which ICMP message is returned when TTL hits zero?",
        a: "ICMP Type 11: Time Exceeded."
      },
      {
        q: "Why do some hops in traceroute output display asterisks (*)?",
        a: "An asterisk indicates a probe timeout, usually because the intermediate router's firewall blocks ICMP or prioritizes regular traffic over diagnostic replies."
      },
      {
        q: "What is the difference between ping and traceroute?",
        a: "Ping tests end-to-end reachability and round-trip delay to a single host; Traceroute reveals every intermediate router hop along the path to the host."
      }
    ]
  },

  {
    id: 9,
    practicalNum: "Practical 9",
    title: "File Transfer Protocol Using TCP Sockets (Client & Server)",
    layer: "Application / Transport Layer (TCP)",
    category: "Client-Server Socket Architecture",
    tags: ["TCP Sockets", "File Transfer", "Header Protocol", "Binary Stream"],
    theory: `File transfer between networked systems requires a reliable connection-oriented transport protocol (TCP).

Architecture & Protocol Design:
1. Server starts, binds to port 5000, and enters listening state (listen(1)).
2. Client connects to server IP and port.
3. Framing Header: Client sends filename and file size terminated by newline bytes ('\\n') so the receiver can parse metadata without fixed field limits.
4. Binary Stream Chunking: Client reads file in 4096-byte buffers and pushes via sendall().
5. Reliable Receipt: Server reads incoming data stream until total received bytes equal the specified file size, saving the contents to disk as 'received_<filename>'.`,
    working: [
      "Step 1: Open two terminals. In Terminal 1, run server.py (listens on 0.0.0.0:5000).",
      "Step 2: In Terminal 2, run client.py.",
      "Step 3: Client enters server IP (127.0.0.1 for local test) and file path to transmit.",
      "Step 4: Client connects over TCP, formats header '{filename}\\n{size}\\n', and sends binary chunks.",
      "Step 5: Server accepts connection, reads filename & size, then loops recv(4096) until total size received.",
      "Step 6: Server saves file as 'received_<filename>' and closes connection."
    ],
    // EXACT CODE FROM EXPERIMENT 9 - DO NOT CHANGE
    code: `# ==========================================
# 1. CLIENT (client.py)
# ==========================================
import socket
import os

HOST = input("Enter server IP address (127.0.0.1 for same PC): ").strip()
PORT = 5000

path = input("Enter file path to send: ").strip()
path = path.strip('"')

try:
    if not os.path.isfile(path):
        raise FileNotFoundError("File does not exist")

    filename = os.path.basename(path)

    if "\\n" in filename or "\\r" in filename:
        raise ValueError("Invalid filename")

    size = os.path.getsize(path)

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
        client.settimeout(30)
        client.connect((HOST, PORT))

        with open(path, "rb") as f:
            header = f"{filename}\\n{size}\\n".encode("utf-8")
            client.sendall(header)

            while True:
                data = f.read(4096)

                if not data:
                    break

                client.sendall(data)

    print("File sent successfully:", filename)

except (OSError, ValueError) as e:
    print("Client error:", e)


# ==========================================
# 2. SERVER (server.py)
# ==========================================
import socket
import os

HOST = "0.0.0.0"
PORT = 5000

def receive_line(conn):
    data = bytearray()

    while True:
        ch = conn.recv(1)

        if not ch:
            raise ConnectionError("Client disconnected")

        if ch == b"\\n":
            return data.decode("utf-8")

        data.extend(ch)

try:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
        server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server.bind((HOST, PORT))
        server.listen(1)

        print("Server listening on port", PORT)
        print("Waiting for client...")

        conn, addr = server.accept()

        with conn:
            print("Connected to:", addr)

            filename = os.path.basename(receive_line(conn))
            size = int(receive_line(conn))

            if not filename or size < 0:
                raise ValueError("Invalid filename or size")

            received = 0
            output_file = "received_" + filename

            with open(output_file, "wb") as f:
                while received < size:
                    data = conn.recv(min(4096, size - received))

                    if not data:
                        raise ConnectionError("File transfer interrupted")

                    f.write(data)
                    received += len(data)

            print("File received successfully!")
            print("Saved as:", output_file)
            print("Bytes received:", received)

except (OSError, ValueError, ConnectionError) as e:
    print("Server error:", e)`,
    sampleInput: `Terminal 1 (Server):
python server.py

Terminal 2 (Client):
python client.py
Enter server IP address (127.0.0.1 for same PC): 127.0.0.1
Enter file path to send: notes.txt`,
    sampleOutput: `[SERVER TERMINAL]
Server listening on port 5000
Waiting for client...
Connected to: ('127.0.0.1', 54820)
File received successfully!
Saved as: received_notes.txt
Bytes received: 1024

[CLIENT TERMINAL]
Enter server IP address (127.0.0.1 for same PC): 127.0.0.1
Enter file path to send: notes.txt
File sent successfully: notes.txt`,
    viva: [
      {
        q: "Why do we open files in binary mode ('rb' / 'wb')?",
        a: "Binary mode preserves the exact byte sequence without character-encoding transformations, which is critical for images, PDFs, archives, and binaries."
      },
      {
        q: "Why is TCP chosen over UDP for file transfer?",
        a: "TCP guarantees reliable in-order delivery, automatic error detection, and retransmission; UDP packets can be dropped or arrive out of order, corrupting the file."
      },
      {
        q: "Why is a metadata header (filename and size) sent before file content?",
        a: "The server needs to know what name to save the file under and exactly how many bytes to receive before closing the file."
      },
      {
        q: "What does SO_REUSEADDR do?",
        a: "It allows the socket to immediately re-bind to the same local port even if it is in the TIME_WAIT state from a previous connection."
      }
    ]
  },

  {
    id: 10,
    practicalNum: "Practical 10",
    title: "Network Diagnostic Commands Suite (Interactive Menu)",
    layer: "Network / Transport / Application Layer",
    category: "OS Networking Utilities",
    tags: ["ping", "tracert", "netstat", "pathping", "nslookup", "arp"],
    theory: `Network administrators utilize command-line diagnostic tools to isolate connectivity failures, inspect routing paths, monitor listening ports, and query DNS infrastructure.

Primary Diagnostic Utilities:
1. Ping: Tests ICMP reachability and round-trip delay.
2. Traceroute (tracert): Traces router hops along the packet route using incremental TTL values.
3. Netstat: Displays active TCP/UDP connections, listening ports, and owning Process IDs (PID).
4. Pathping: Hybrid tool combining traceroute and ping over several minutes to measure per-hop packet loss.
5. Nslookup: Queries DNS servers for forward and reverse lookups, MX records, and nameservers.
6. ARP: Displays and manages the Address Resolution Protocol cache mapping IP to MAC addresses.`,
    working: [
      "Step 1: Present an interactive numeric menu for ping, tracert, netstat, pathping, nslookup, arp.",
      "Step 2: Collect target hostname or IP address when required.",
      "Step 3: Construct platform-appropriate command-line arguments for Windows or Unix.",
      "Step 4: Check if executable exists using shutil.which().",
      "Step 5: Run command asynchronously via subprocess.run() with a 60-second timeout.",
      "Step 6: Print stdout, stderr, and execution exit codes."
    ],
    code: `import platform
import subprocess
import shutil

system = platform.system()

while True:
    print("\\n--- NETWORK COMMANDS ---")
    print("1. Ping")
    print("2. Traceroute")
    print("3. Netstat")
    print("4. Pathping")
    print("5. Nslookup")
    print("6. ARP")
    print("0. Exit")

    choice = input("Enter choice: ").strip()

    if choice == "0":
        break

    if choice not in {"1", "2", "3", "4", "5", "6"}:
        print("Invalid choice")
        continue

    host = ""

    if choice in {"1", "2", "4", "5"}:
        host = input("Enter hostname or IP: ").strip()

        if not host or any(ch.isspace() for ch in host):
            print("Invalid hostname or IP")
            continue

    if choice == "1":
        if system == "Windows":
            cmd = ["ping", "-n", "4", host]
        else:
            cmd = ["ping", "-c", "4", host]

    elif choice == "2":
        if system == "Windows":
            cmd = ["tracert", "-d", "-h", "15", host]
        else:
            cmd = ["traceroute", "-n", "-m", "15", host]

    elif choice == "3":
        if system == "Windows":
            cmd = ["netstat", "-ano"]
        else:
            cmd = ["netstat", "-an"]

    elif choice == "4":
        if system != "Windows":
            print("Pathping is available on Windows only")
            continue
        cmd = ["pathping", "-n", host]

    elif choice == "5":
        cmd = ["nslookup", host]

    else:
        cmd = ["arp", "-a"]

    if shutil.which(cmd[0]) is None:
        print(cmd[0], "command is unavailable on this system")
        continue

    try:
        print("\\nExecuting:", " ".join(cmd))

        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=60
        )

        print(result.stdout)

        if result.stderr:
            print(result.stderr)

        if result.returncode != 0:
            print("Command returned exit code:", result.returncode)

    except subprocess.TimeoutExpired:
        print("Command timed out")
    except OSError as e:
        print("Execution error:", e)

print("Program terminated")`,
    sampleInput: `Enter choice: 1
Enter hostname or IP: 8.8.8.8`,
    sampleOutput: `Executing: ping -n 4 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=12ms TTL=117
Reply from 8.8.8.8: bytes=32 time=11ms TTL=117
Reply from 8.8.8.8: bytes=32 time=11ms TTL=117
Reply from 8.8.8.8: bytes=32 time=12ms TTL=117

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`,
    viva: [
      {
        q: "What does the netstat -ano command show?",
        a: "'-a' shows all active connections and listening ports, '-n' shows numerical addresses and ports, and '-o' displays the PID of the owning process."
      },
      {
        q: "How does pathping differ from tracert?",
        a: "Tracert identifies hops immediately; Pathping identifies hops and then continuously pings each intermediate hop over several minutes to calculate exact packet loss percentages."
      },
      {
        q: "What is an ARP table?",
        a: "A local cache mapping IPv4 addresses to physical MAC addresses on the local network."
      },
      {
        q: "What is the difference between authoritative and non-authoritative DNS answers?",
        a: "An authoritative answer comes directly from the nameserver hosting the domain's master records; a non-authoritative answer comes from a resolver's cache."
      }
    ]
  }
];

export const FTP_PRACTICAL_DATA = {
  title: "10. FTP Protocol and File Transfer Between Client and Server",
  layer: "Application Layer",
  overview: "FTP (File Transfer Protocol) uses two separate connections: TCP port 21 for Control commands and an ephemeral TCP port for Data transfer.",
  installation: "python -m pip install pyftpdlib",
  serverCode: `from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import os

os.makedirs("ftp_files", exist_ok=True)
authorizer = DummyAuthorizer()
authorizer.add_user(
    "student",
    "cn123",
    os.path.abspath("ftp_files"),
    perm="elradfmwMT"
)
handler = FTPHandler
handler.authorizer = authorizer
server = FTPServer(("127.0.0.1", 2121), handler)
print("FTP server running on 127.0.0.1:2121")
server.serve_forever()`,
  clientCode: `from ftplib import FTP
import os

HOST = "127.0.0.1"
PORT = 2121
USERNAME = "student"
PASSWORD = "cn123"

filename = input("Enter the local file path to upload: ")
if not os.path.isfile(filename):
    print("File not found.")
    raise SystemExit(1)

ftp = FTP()
ftp.connect(HOST, PORT, timeout=10)
ftp.login(USERNAME, PASSWORD)

with open(filename, "rb") as file:
    ftp.storbinary("STOR " + os.path.basename(filename), file)

print("File uploaded successfully.")
ftp.quit()`,
  downloadCode: `with open("downloaded.txt", "wb") as file:
    ftp.retrbinary("RETR sample.txt", file.write)
print("File downloaded successfully.")`,
  sampleOutput: `FTP server running on 127.0.0.1:2121

Client:
Enter the local file path to upload: sample.txt
File uploaded successfully.`,
  viva: [
    { q: "Which transport protocol does FTP use?", a: "TCP." },
    { q: "What is the default FTP control port?", a: "TCP port 21 (and port 20 for active data transfer)." },
    { q: "What is the difference between FTP and SFTP?", a: "FTP is a legacy unencrypted dual-connection protocol; SFTP is an encrypted subsystem running over SSH (port 22)." },
    { q: "What does storbinary() do?", a: "Uploads a local file to the FTP server in binary mode using the STOR command." },
    { q: "What does retrbinary() do?", a: "Downloads a file from the FTP server to the local system using the RETR command." }
  ]
};

export const NSLOOKUP_PRACTICAL_DATA = {
  title: "12. Python Program to Demonstrate Nslookup (DNS Resolution)",
  layer: "Application Layer (DNS)",
  code: `import subprocess

domain = input("Enter domain name: ").strip()

if not domain or any(c.isspace() for c in domain):
    print("Please enter a valid domain name.")
else:
    try:
        result = subprocess.run(
            ["nslookup", domain],
            capture_output=True,
            text=True,
            timeout=15
        )
        print("\\nDNS lookup result:")
        print(result.stdout)
        if result.returncode != 0 and result.stderr:
            print(result.stderr)
    except FileNotFoundError:
        print("nslookup command is not available.")
    except subprocess.TimeoutExpired:
        print("DNS lookup timed out.")`,
  sampleOutput: `Enter domain name: google.com

DNS lookup result:
Server:  dns.google
Address: 8.8.8.8

Non-authoritative answer:
Name:    google.com
Addresses:  142.250.190.46`,
  viva: [
    { q: "What is DNS?", a: "Domain Name System: a distributed hierarchical database that translates human-readable hostnames to IP addresses." },
    { q: "What is a DNS resolver?", a: "A service or server that queries DNS hierarchy on behalf of a client to retrieve requested records." },
    { q: "What is an MX record?", a: "Mail Exchanger record: designates the mail server responsible for accepting emails on behalf of a domain." },
    { q: "What does nslookup do?", a: "Queries DNS servers directly to inspect A, AAAA, MX, NS, and CNAME records." }
  ]
};

export const COMMANDS_REFERENCE = [
  {
    name: "ping",
    purpose: "Checks ICMP Echo Request/Reply reachability and measures RTT.",
    windowsSyntax: "ping -n 4 8.8.8.8",
    linuxSyntax: "ping -c 4 8.8.8.8",
    keyOptions: [
      { flag: "-n <count>", desc: "Specifies number of echo requests to send (Windows)" },
      { flag: "-t", desc: "Pings destination continuously until stopped with Ctrl+C" },
      { flag: "-l <bytes>", desc: "Specifies packet buffer size in bytes" }
    ],
    useCase: "Verifying if a machine is alive and measuring round-trip latency."
  },
  {
    name: "tracert / traceroute",
    purpose: "Displays all intermediate router hops to a remote host using TTL.",
    windowsSyntax: "tracert -d google.com",
    linuxSyntax: "traceroute -n google.com",
    keyOptions: [
      { flag: "-d", desc: "Do not resolve addresses to hostnames (runs much faster)" },
      { flag: "-h <hops>", desc: "Maximum number of hops to search (default 30)" },
      { flag: "-w <timeout>", desc: "Timeout in milliseconds for each reply" }
    ],
    useCase: "Pinpointing which router hop in the network path is failing or causing latency."
  },
  {
    name: "netstat",
    purpose: "Displays active network connections, routing tables, and listening ports.",
    windowsSyntax: "netstat -ano",
    linuxSyntax: "netstat -tulnp",
    keyOptions: [
      { flag: "-a", desc: "Displays all active connections and listening TCP/UDP ports" },
      { flag: "-n", desc: "Displays addresses and port numbers in numerical format" },
      { flag: "-o", desc: "Displays the owning process ID (PID) for each connection" }
    ],
    useCase: "Identifying rogue ports or finding which program occupies port 5000 / 8080."
  },
  {
    name: "pathping",
    purpose: "Combines ping and traceroute over a period of time to calculate per-hop packet loss.",
    windowsSyntax: "pathping -n google.com",
    linuxSyntax: "mtr google.com (My Traceroute on Linux)",
    keyOptions: [
      { flag: "-n", desc: "Do not resolve addresses to hostnames" },
      { flag: "-h <hops>", desc: "Maximum number of hops" },
      { flag: "-q <queries>", desc: "Number of queries per hop" }
    ],
    useCase: "Analyzing long-term packet loss and jitter across WAN/Internet routes."
  },
  {
    name: "nslookup",
    purpose: "Queries DNS servers directly to inspect domain names and DNS records.",
    windowsSyntax: "nslookup google.com 8.8.8.8",
    linuxSyntax: "nslookup -type=MX gmail.com",
    keyOptions: [
      { flag: "server <ip>", desc: "Specifies alternative DNS resolver server (e.g. 8.8.8.8)" },
      { flag: "-type=MX", desc: "Queries Mail Exchange records" },
      { flag: "-type=NS", desc: "Queries authoritative Name Servers" }
    ],
    useCase: "Troubleshooting domain resolution errors and verifying DNS zone records."
  }
];

export const LAST_MINUTE_REVISION = {
  algorithmSummaries: [
    {
      title: "Leaky Bucket",
      concept: "Smooths bursty traffic to a constant rate; buffer drops excess incoming packets on overflow."
    },
    {
      title: "Stop-and-Wait",
      concept: "Sender transmits 1 frame, freezes, waits for ACK before sending next; retransmits on timeout."
    },
    {
      title: "Sliding Window",
      concept: "Pipelines up to W unacknowledged frames; window slides forward as ACKs arrive."
    },
    {
      title: "Framing (Byte Stuffing)",
      concept: "Delimits frames with FLAG ('F'); escapes payload FLAG or ESC characters by prefixing ESC ('E')."
    },
    {
      title: "Distance Vector (Bellman-Ford)",
      concept: "Routers iteratively share distance vectors with neighbors; updates route costs using D_x(y) = min { c(x,v) + D_v(y) }."
    }
  ],
  networkingSummaries: [
    {
      title: "Socket Primitives",
      concept: "socket -> bind -> listen -> accept -> send/recv -> close for server; socket -> connect -> send/recv -> close for client."
    },
    {
      title: "IP Protocol",
      concept: "Connectionless best-effort delivery. IPv4 is 32 bits, IPv6 is 128 bits. Subnet mask delineates Network from Host."
    },
    {
      title: "Traceroute & TTL",
      concept: "Increments TTL from 1 upwards; intermediate routers return ICMP Time Exceeded (Type 11) until target is reached."
    },
    {
      title: "FTP Architecture",
      concept: "Dual connection: Port 21 for Control commands, ephemeral port for Data transfer. Uses TCP; unencrypted by default."
    },
    {
      title: "Commands Fast Recap",
      concept: "ping = reachability & RTT; tracert = route hops; netstat = ports & sockets; pathping = packet loss; nslookup = DNS lookup."
    }
  ],
  studyPlan: [
    { time: "First 30 Mins", title: "Theory & Viva Mastery", desc: "Review the theory, layer classification, and viva answers for all 10 practicals." },
    { time: "Next 60 Mins", title: "Code & Logic Review", desc: "Inspect and trace loops for Algorithms 1–5: Leaky Bucket, Stop-and-Wait, Sliding Window, Framing, and Bellman-Ford." },
    { time: "Next 45 Mins", title: "Windows Commands Practice", desc: "Open PowerShell and execute ping, tracert -d, netstat -ano, and nslookup google.com." },
    { time: "Next 45 Mins", title: "Socket & File Transfer", desc: "Run client and server across two terminal tabs; understand socket primitives (socket, bind, listen, accept, connect)." },
    { time: "Final 20 Mins", title: "Self-Testing Flashcards", desc: "Quiz yourself using the Viva toggle mode without looking at answers!" }
  ]
};
