// src/data/aoaCodes.js

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

if any(len(row) != n for row in cost):
    raise ValueError("Each row must contain n values")

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
    print("Destination  Cost  Next Hop")

    for j in range(n):
        print(j, "           ", dist[i][j], "   ", next_hop[i][j])
`
  },

  {
    title: "CN Practical 6: Socket Primitives and Ping",
    code: `
import platform
import subprocess

host = input("Enter IP address or hostname: ")

if platform.system() == "Windows":
    command = ["ping", "-n", "4", host]
else:
    command = ["ping", "-c", "4", host]

try:
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        timeout=20
    )

    print(result.stdout)

    if result.returncode == 0:
        print("Host is reachable")
    else:
        print("Ping failed")

except (subprocess.TimeoutExpired, FileNotFoundError) as e:
    print("Error:", e)
`
  },

  {
    title: "CN Practical 7: IP Protocol and IP Configuration",
    code: `
import socket
import platform
import subprocess

print("Hostname:", socket.gethostname())

try:
    print("\\nIP addresses:")

    addresses = socket.getaddrinfo(
        socket.gethostname(), None
    )

    for ip in sorted(set(item[4][0] for item in addresses)):
        print(ip)

except socket.gaierror as e:
    print("Address lookup failed:", e)

system = platform.system()

if system == "Windows":
    command = ["ipconfig"]
elif system == "Darwin":
    command = ["ifconfig"]
else:
    command = ["ip", "addr"]

try:
    result = subprocess.run(
        command,
        capture_output=True,
        text=True
    )

    print("\\nNetwork configuration:")
    print(result.stdout)

except FileNotFoundError:
    print("Configuration command not found")
`
  },

  {
    title: "CN Practical 8: Socket Programming and Traceroute",
    code: `
import platform
import subprocess

host = input("Enter destination hostname or IP: ")

if platform.system() == "Windows":
    command = ["tracert", host]
else:
    command = ["traceroute", host]

try:
    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        timeout=120
    )

    print(result.stdout)

    if result.stderr:
        print(result.stderr)

except subprocess.TimeoutExpired:
    print("Traceroute timed out")

except FileNotFoundError:
    print("Traceroute command not installed")
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
            return data.decode()

        data.extend(ch)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT))
    server.listen(1)

    print("Waiting for client...")
    conn, addr = server.accept()

    with conn:
        print("Connected:", addr)

        filename = os.path.basename(receive_line(conn))
        size = int(receive_line(conn))

        if not filename or size < 0:
            raise ValueError("Invalid filename or file size")

        with open("received_" + filename, "wb") as f:
            remaining = size

            while remaining > 0:
                data = conn.recv(min(4096, remaining))

                if not data:
                    raise ConnectionError("Incomplete file transfer")

                f.write(data)
                remaining -= len(data)

        print("File received successfully")
`
  },

  {
    title: "CN Practical 9B: File Transfer Client",
    code: `
import socket
import os

HOST = input("Enter server IP address: ")
PORT = 5000
path = input("Enter file path: ")

try:
    size = os.path.getsize(path)
    filename = os.path.basename(path)

    with open(path, "rb") as f:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
            client.connect((HOST, PORT))
            client.sendall(f"{filename}\\n{size}\\n".encode())

            while True:
                data = f.read(4096)

                if not data:
                    break

                client.sendall(data)

    print("File sent successfully")

except (OSError, ValueError) as e:
    print("Error:", e)
`
  },

  {
    title: "CN Practical 10: Network Commands",
    code: `
import subprocess
import platform

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

    if choice in {"1", "2", "4", "5"}:
        host = input("Enter hostname or IP: ").strip()

        if not host:
            print("Host cannot be empty")
            continue

    if choice == "1":
        cmd = (
            ["ping", "-n", "4", host]
            if system == "Windows"
            else ["ping", "-c", "4", host]
        )

    elif choice == "2":
        cmd = (
            ["tracert", host]
            if system == "Windows"
            else ["traceroute", host]
        )

    elif choice == "3":
        cmd = (
            ["netstat", "-ano"]
            if system == "Windows"
            else ["netstat", "-an"]
        )

    elif choice == "4":
        if system != "Windows":
            print("Pathping is available on Windows only")
            continue

        cmd = ["pathping", host]

    elif choice == "5":
        cmd = ["nslookup", host]

    else:
        cmd = ["arp", "-a"]

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=120
        )

        print(result.stdout)

        if result.stderr:
            print(result.stderr)

    except (FileNotFoundError, subprocess.TimeoutExpired) as e:
        print("Error:", e)
`
  }
];