// src/data/aoaCodes.js
export const AOA_CODES = [
  {
    title: "1️⃣ Binary Search",
    code: `
int binarySearch(int arr[], int n, int key) {
  int low = 0, high = n - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == key)
      return mid;
    else if (arr[mid] < key)
      low = mid + 1;
    else
      high = mid - 1;
  }
  return -1;
}`,
  },
  {
    title: "2️⃣ Merge Sort",
    code: `
void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++];
    else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
  },
  {
    title: "3️⃣ Quick Sort",
    code: `
int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
  },
  {
    title: "4️⃣ Fractional Knapsack",
    code: `
def fractional_knapsack(values, weights, capacity):
    ratio_items = [(values[i] / weights[i], values[i], weights[i]) for i in range(len(values))]
    ratio_items.sort(reverse=True, key=lambda x: x[0])
    total_value = 0.0
    remaining_capacity = capacity

    for ratio, value, weight in ratio_items:
        if remaining_capacity == 0:
            break
        if weight <= remaining_capacity:
            total_value += value
            remaining_capacity -= weight
        else:
            total_value += ratio * remaining_capacity
            remaining_capacity = 0
    return total_value


n = int(input("Enter number of items: "))
values = list(map(float, input("Enter values of items: ").split()))
weights = list(map(float, input("Enter weights of items: ").split()))
capacity = float(input("Enter knapsack capacity: "))
max_value = fractional_knapsack(values, weights, capacity)
print("Maximum value in Knapsack (fractional):", max_value)
`,
  },
  {
    title: "5️⃣ Prim's Algorithm",
    code: `
import sys

V = 5  # Number of vertices

def min_key(key, mst_set):
    min_val = sys.maxsize
    min_index = -1
    for v in range(V):
        if key[v] < min_val and not mst_set[v]:
            min_val = key[v]
            min_index = v
    return min_index

def print_mst(parent, graph):
    print("Edge \tWeight")
    for i in range(1, V):
        print(f"{parent[i]} - {i} \t{graph[i][parent[i]]}")

def prim_mst(graph):
    key = [sys.maxsize] * V
    parent = [None] * V
    mst_set = [False] * V

    key[0] = 0
    parent[0] = -1

    for _ in range(V):
        u = min_key(key, mst_set)
        mst_set[u] = True
        for v in range(V):
            if graph[u][v] and not mst_set[v] and graph[u][v] < key[v]:
                key[v] = graph[u][v]
                parent[v] = u
    print_mst(parent, graph)

graph = [
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0]
]

prim_mst(graph)
`,
  },
  {
    title: "6️⃣ Floyd–Warshall Algorithm",
    code: `
INF = 99999
V = 4

def floyd_warshall(graph):
    dist = [row[:] for row in graph]
    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    print_solution(dist)

def print_solution(dist):
    print("Shortest distance matrix:")
    for i in range(V):
        for j in range(V):
            if dist[i][j] == INF:
                print("INF", end="\\t")
            else:
                print(dist[i][j], end="\\t")
        print()

graph = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0]
]

floyd_warshall(graph)
`,
  },
  {
    title: "7️⃣ LCS (Longest Common Subsequence)",
    code: `
def lcs(X, Y):
    m, n = len(X), len(Y)
    L = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i - 1] == Y[j - 1]:
                L[i][j] = 1 + L[i - 1][j - 1]
            else:
                L[i][j] = max(L[i - 1][j], L[i][j - 1])

    i, j = m, n
    lcs_str = []
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            lcs_str.append(X[i - 1])
            i -= 1
            j -= 1
        elif L[i - 1][j] > L[i][j - 1]:
            i -= 1
        else:
            j -= 1

    return L[m][n], ''.join(reversed(lcs_str))

X = input("Enter first string: ")
Y = input("Enter second string: ")
length, subseq = lcs(X, Y)
print("Length of LCS:", length)
print("LCS:", subseq)
`,
  },
  {
    title: "8️⃣ DFS & BFS",
    code: `
from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}
// src/data/aoaCodes.js
export const AOA_CODES = [
  {
    title: "1️⃣ Binary Search",
    code: `
int binarySearch(int arr[], int n, int key) {
  int low = 0, high = n - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == key)
      return mid;
    else if (arr[mid] < key)
      low = mid + 1;
    else
      high = mid - 1;
  }
  return -1;
}`,
  },
  {
    title: "2️⃣ Merge Sort",
    code: `
void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++];
    else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
  },
  {
    title: "3️⃣ Quick Sort",
    code: `
int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
  },
  {
    title: "4️⃣ Insertion Sort",
    code: `
void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
  },
  {
    title: "5️⃣ Selection Sort",
    code: `
void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int min_idx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    int temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
}`,
  },
  {
    title: "6️⃣ Fractional Knapsack",
    code: `
def fractional_knapsack(values, weights, capacity):
    ratio_items = [(values[i] / weights[i], values[i], weights[i]) for i in range(len(values))]
    ratio_items.sort(reverse=True, key=lambda x: x[0])
    total_value = 0.0
    remaining_capacity = capacity

    for ratio, value, weight in ratio_items:
        if remaining_capacity == 0:
            break
        if weight <= remaining_capacity:
            total_value += value
            remaining_capacity -= weight
        else:
            total_value += ratio * remaining_capacity
            remaining_capacity = 0
    return total_value


n = int(input("Enter number of items: "))
values = list(map(float, input("Enter values of items: ").split()))
weights = list(map(float, input("Enter weights of items: ").split()))
capacity = float(input("Enter knapsack capacity: "))
max_value = fractional_knapsack(values, weights, capacity)
print("Maximum value in Knapsack (fractional):", max_value)
`,
  },
  {
    title: "7️⃣ Prim's Algorithm",
    code: `
import sys

V = 5  # Number of vertices

def min_key(key, mst_set):
    min_val = sys.maxsize
    min_index = -1
    for v in range(V):
        if key[v] < min_val and not mst_set[v]:
            min_val = key[v]
            min_index = v
    return min_index

def print_mst(parent, graph):
    print("Edge \tWeight")
    for i in range(1, V):
        print(f"{parent[i]} - {i} \t{graph[i][parent[i]]}")

def prim_mst(graph):
    key = [sys.maxsize] * V
    parent = [None] * V
    mst_set = [False] * V

    key[0] = 0
    parent[0] = -1

    for _ in range(V):
        u = min_key(key, mst_set)
        mst_set[u] = True
        for v in range(V):
            if graph[u][v] and not mst_set[v] and graph[u][v] < key[v]:
                key[v] = graph[u][v]
                parent[v] = u
    print_mst(parent, graph)

graph = [
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0]
]

prim_mst(graph)
`,
  },
  {
    title: "8️⃣ Floyd–Warshall Algorithm",
    code: `
INF = 99999
V = 4

def floyd_warshall(graph):
    dist = [row[:] for row in graph]
    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    print_solution(dist)

def print_solution(dist):
    print("Shortest distance matrix:")
    for i in range(V):
        for j in range(V):
            if dist[i][j] == INF:
                print("INF", end="\\t")
            else:
                print(dist[i][j], end="\\t")
        print()

graph = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0]
]

floyd_warshall(graph)
`,
  },
  {
    title: "9️⃣ LCS (Longest Common Subsequence)",
    code: `
def lcs(X, Y):
    m, n = len(X), len(Y)
    L = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i - 1] == Y[j - 1]:
                L[i][j] = 1 + L[i - 1][j - 1]
            else:
                L[i][j] = max(L[i - 1][j], L[i][j - 1])

    i, j = m, n
    lcs_str = []
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            lcs_str.append(X[i - 1])
            i -= 1
            j -= 1
        elif L[i - 1][j] > L[i][j - 1]:
            i -= 1
        else:
            j -= 1

    return L[m][n], ''.join(reversed(lcs_str))

X = input("Enter first string: ")
Y = input("Enter second string: ")
length, subseq = lcs(X, Y)
print("Length of LCS:", length)
print("LCS:", subseq)
`,
  },
  {
    title: "🔟 DFS & BFS",
    code: `
from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    if node not in visited:
        print(node, end=" ")
        visited.add(node)
        for neighbor in graph[node]:
            dfs(graph, neighbor, visited)
    return visited

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        node = queue.popleft()
        print(node, end=" ")
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

print("DFS Traversal (starting from A):")
dfs(graph, 'A')
print("\\nBFS Traversal (starting from A):")
bfs(graph, 'A')
`,
  },
  {
    title: "1️⃣1️⃣ N-Queen Problem",
    code: `
def print_board(positions, N):
    for r in range(N):
        line = ""
        for c in range(N):
            line += "Q" if positions[r] == c else "."
        print(line)
    print()

def solve_n_queens(N):
    solutions = []
    positions = [-1] * N
    cols, diag1, diag2 = set(), set(), set()

    def backtrack(row=0):
        if row == N:
            solutions.append(positions.copy())
            return
        for col in range(N):
            d1, d2 = row + col, row - col
            if col in cols or d1 in diag1 or d2 in diag2:
                continue
            positions[row] = col
            cols.add(col); diag1.add(d1); diag2.add(d2)
            backtrack(row + 1)
            positions[row] = -1
            cols.remove(col); diag1.remove(d1); diag2.remove(d2)

    backtrack()
    return solutions

def main():
    N = int(input("Enter number of queens (N): "))
    sols = solve_n_queens(N)
    print(f"\\nTotal solutions for {N}-Queens: {len(sols)}\\n")
    for i, sol in enumerate(sols, start=1):
        print(f"Solution #{i}:")
        print_board(sol, N)

if __name__ == "__main__":
    main()
`,
  },
  {
    title: "1️⃣2️⃣ Naive String Matching",
    code: `
def naive_string_match(text, pattern):
    n, m = len(text), len(pattern)
    found = False
    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        if j == m:
            print(f"Pattern found at index {i}")
            found = True
    if not found:
        print("Pattern not found")

text = "ABAAABCDBBABCDDEBCABC"
pattern = "ABC"
print("Text:", text)
print("Pattern:", pattern)
print("\\nNaive String Matching Result:")
naive_string_match(text, pattern)
`,
  },
];// src/data/aoaCodes.js
export const AOA_CODES = [
  {
    title: "1️⃣ Binary Search",
    code: `
int binarySearch(int arr[], int n, int key) {
  int low = 0, high = n - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == key)
      return mid;
    else if (arr[mid] < key)
      low = mid + 1;
    else
      high = mid - 1;
  }
  return -1;
}`,
  },
  {
    title: "2️⃣ Merge Sort",
    code: `
void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[n1], R[n2];
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++];
    else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
  },
  {
    title: "3️⃣ Quick Sort",
    code: `
int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
  },
  {
    title: "4️⃣ Insertion Sort",
    code: `
void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
  },
  {
    title: "5️⃣ Selection Sort",
    code: `
void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int min_idx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
    int temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
}`,
  },
  {
    title: "6️⃣ Fractional Knapsack",
    code: `
def fractional_knapsack(values, weights, capacity):
    ratio_items = [(values[i] / weights[i], values[i], weights[i]) for i in range(len(values))]
    ratio_items.sort(reverse=True, key=lambda x: x[0])
    total_value = 0.0
    remaining_capacity = capacity

    for ratio, value, weight in ratio_items:
        if remaining_capacity == 0:
            break
        if weight <= remaining_capacity:
            total_value += value
            remaining_capacity -= weight
        else:
            total_value += ratio * remaining_capacity
            remaining_capacity = 0
    return total_value


n = int(input("Enter number of items: "))
values = list(map(float, input("Enter values of items: ").split()))
weights = list(map(float, input("Enter weights of items: ").split()))
capacity = float(input("Enter knapsack capacity: "))
max_value = fractional_knapsack(values, weights, capacity)
print("Maximum value in Knapsack (fractional):", max_value)
`,
  },
  {
    title: "7️⃣ Prim's Algorithm",
    code: `
import sys

V = 5  # Number of vertices

def min_key(key, mst_set):
    min_val = sys.maxsize
    min_index = -1
    for v in range(V):
        if key[v] < min_val and not mst_set[v]:
            min_val = key[v]
            min_index = v
    return min_index

def print_mst(parent, graph):
    print("Edge \tWeight")
    for i in range(1, V):
        print(f"{parent[i]} - {i} \t{graph[i][parent[i]]}")

def prim_mst(graph):
    key = [sys.maxsize] * V
    parent = [None] * V
    mst_set = [False] * V

    key[0] = 0
    parent[0] = -1

    for _ in range(V):
        u = min_key(key, mst_set)
        mst_set[u] = True
        for v in range(V):
            if graph[u][v] and not mst_set[v] and graph[u][v] < key[v]:
                key[v] = graph[u][v]
                parent[v] = u
    print_mst(parent, graph)

graph = [
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0]
]

prim_mst(graph)
`,
  },
  {
    title: "8️⃣ Floyd–Warshall Algorithm",
    code: `
INF = 99999
V = 4

def floyd_warshall(graph):
    dist = [row[:] for row in graph]
    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    print_solution(dist)

def print_solution(dist):
    print("Shortest distance matrix:")
    for i in range(V):
        for j in range(V):
            if dist[i][j] == INF:
                print("INF", end="\\t")
            else:
                print(dist[i][j], end="\\t")
        print()

graph = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0]
]

floyd_warshall(graph)
`,
  },
  {
    title: "9️⃣ LCS (Longest Common Subsequence)",
    code: `
def lcs(X, Y):
    m, n = len(X), len(Y)
    L = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i - 1] == Y[j - 1]:
                L[i][j] = 1 + L[i - 1][j - 1]
            else:
                L[i][j] = max(L[i - 1][j], L[i][j - 1])

    i, j = m, n
    lcs_str = []
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            lcs_str.append(X[i - 1])
            i -= 1
            j -= 1
        elif L[i - 1][j] > L[i][j - 1]:
            i -= 1
        else:
            j -= 1

    return L[m][n], ''.join(reversed(lcs_str))

X = input("Enter first string: ")
Y = input("Enter second string: ")
length, subseq = lcs(X, Y)
print("Length of LCS:", length)
print("LCS:", subseq)
`,
  },
  {
    title: "🔟 DFS & BFS",
    code: `
from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    if node not in visited:
        print(node, end=" ")
        visited.add(node)
        for neighbor in graph[node]:
            dfs(graph, neighbor, visited)
    return visited

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        node = queue.popleft()
        print(node, end=" ")
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

print("DFS Traversal (starting from A):")
dfs(graph, 'A')
print("\\nBFS Traversal (starting from A):")
bfs(graph, 'A')
`,
  },
  {
    title: "1️⃣1️⃣ N-Queen Problem",
    code: `
def print_board(positions, N):
    for r in range(N):
        line = ""
        for c in range(N):
            line += "Q" if positions[r] == c else "."
        print(line)
    print()

def solve_n_queens(N):
    solutions = []
    positions = [-1] * N
    cols, diag1, diag2 = set(), set(), set()

    def backtrack(row=0):
        if row == N:
            solutions.append(positions.copy())
            return
        for col in range(N):
            d1, d2 = row + col, row - col
            if col in cols or d1 in diag1 or d2 in diag2:
                continue
            positions[row] = col
            cols.add(col); diag1.add(d1); diag2.add(d2)
            backtrack(row + 1)
            positions[row] = -1
            cols.remove(col); diag1.remove(d1); diag2.remove(d2)

    backtrack()
    return solutions

def main():
    N = int(input("Enter number of queens (N): "))
    sols = solve_n_queens(N)
    print(f"\\nTotal solutions for {N}-Queens: {len(sols)}\\n")
    for i, sol in enumerate(sols, start=1):
        print(f"Solution #{i}:")
        print_board(sol, N)

if __name__ == "__main__":
    main()
`,
  },
  {
    title: "1️⃣2️⃣ Naive String Matching",
    code: `
def naive_string_match(text, pattern):
    n, m = len(text), len(pattern)
    found = False
    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        if j == m:
            print(f"Pattern found at index {i}")
            found = True
    if not found:
        print("Pattern not found")

text = "ABAAABCDBBABCDDEBCABC"
pattern = "ABC"
print("Text:", text)
print("Pattern:", pattern)
print("\\nNaive String Matching Result:")
naive_string_match(text, pattern)
`,
  },
];
