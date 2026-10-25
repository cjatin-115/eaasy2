
export const JAVA_CODES = [
  {
    title: "CN Practical 1: Leaky Bucket Algorithm",
    code: `
bucket_size = 10
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
    print("Packets remaining:", bucket)
`
  },

  {
    title: "CN Practical 2: Stop-and-Wait Protocol",
    code: `
n = int(input("Enter number of frames: "))

for i in range(1, n + 1):
    print("\\nSending frame:", i)
    ack = input("ACK received? (y/n): ").lower()

    while ack != "y":
        print("Retransmitting frame:", i)
        ack = input("ACK received? (y/n): ").lower()

    print("Frame", i, "received successfully")

print("All frames transmitted")
`
  },

  {
    title: "CN Practical 3: Sliding Window Protocol",
    code: `
n = int(input("Enter total frames: "))
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

    print("All frames acknowledged")
`
  },

  {
    title: "CN Practical 4: Framing Using Byte Stuffing",
    code: `
FLAG = "F"
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

print("Destuffed data:", result)
`
  },

  {
    title: "CN Practical 5: Distance Vector Routing",
    code: `
n = int(input("Enter number of routers: "))

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
        print(j, "|", dist[i][j], "|", next_hop[i][j])
`
  },

  {
    title: "CN Practical 6: Socket Programming and Ping",
    code: `
import socket

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
    print("Network error:", e)
`
  },

  {
    title: "CN Practical 7: IP Protocol and IP Configuration",
    code: `
import socket
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
    print("Command timed out")
`
  },

  {
    title: "CN Practical 8: Socket Programming and Traceroute",
    code: `
import socket
import time

host = input("Enter destination hostname: ").strip()
max_hops = 15
port = 33434

try:
    destination = socket.gethostbyname(host)
    print("Tracing route to", host, "(", destination, ")")

    for ttl in range(1, max_hops + 1):
        receiver = socket.socket(
            socket.AF_INET,
            socket.SOCK_DGRAM
        )
        sender = socket.socket(
            socket.AF_INET,
            socket.SOCK_DGRAM
        )

        receiver.settimeout(2)
        receiver.bind(("", port))
        sender.setsockopt(
            socket.SOL_IP,
            socket.IP_TTL,
            ttl
        )

        start = time.time()

        try:
            sender.sendto(b"Traceroute test", (host, port))
            data, address = receiver.recvfrom(512)

            elapsed = (time.time() - start) * 1000
            print(
                ttl,
                address[0],
                round(elapsed, 2),
                "ms"
            )

            if address[0] == destination:
                print("Destination reached")
                break

        except socket.timeout:
            print(ttl, "* * * Request timed out")

        except OSError as e:
            print("Socket error:", e)
            break

        finally:
            sender.close()
            receiver.close()

except socket.gaierror:
    print("Invalid hostname or DNS resolution failed")
except OSError as e:
    print("Traceroute unavailable:", e)
`
  },

  {
    title: "CN Practical 9A: File Transfer Server",
    code: `
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
            print("Connected:", addr)

            filename = os.path.basename(receive_line(conn))
            size = int(receive_line(conn))

            if not filename or size < 0:
                raise ValueError("Invalid filename or size")

            received = 0

            with open("received_" + filename, "wb") as f:
                while received < size:
                    data = conn.recv(min(4096, size - received))

                    if not data:
                        raise ConnectionError("Incomplete file transfer")

                    f.write(data)
                    received += len(data)

            print("File received:", filename)
            print("Bytes received:", received)

except (OSError, ValueError, ConnectionError) as e:
    print("Server error:", e)
`
  },

  {
    title: "CN Practical 9B: File Transfer Client",
    code: `
import socket
import os

HOST = input("Enter server IP address: ").strip()
PORT = 5000
path = input("Enter file path: ").strip()

try:
    if not os.path.isfile(path):
        raise FileNotFoundError("File does not exist")

    filename = os.path.basename(path)
    size = os.path.getsize(path)

    if "\\n" in filename or "\\r" in filename:
        raise ValueError("Invalid filename")

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
`
  },

  {
    title: "CN Practical 10: Network Commands",
    code: `
import platform
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

print("Program terminated")
`
  }
];
