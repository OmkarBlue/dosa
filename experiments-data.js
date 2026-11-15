// Data Structures Lab Experiments Data
// Extracted directly from Lab Manual PDF

const EXPERIMENTS = [
  {
    id: 1,
    slug: "exp-1",
    number: "Experiment 01",
    shortNumber: "01",
    category: "Stack",
    title: "Write a program to implement stack using arrays.",
    aim: "The main aim of this lab is to understand various concepts in stack and implement various operations associated with stack such as Push, Pop, and Stack Overflow.",
    objective: "To implement a stack data structure using an array and perform basic operations such as push, pop, peek/display, while handling overflow and underflow conditions.",
    theory: "A Stack is a linear data structure that follows the LIFO (Last-In-First-Out) principle. Stack has one end (top pointer). Elements are added and deleted from the top of the stack.",
    sampleOutput: `Enter the size of stack: 3

Select the operation to be performed on stack
1. Push
2. Pop
3. Display
Enter your choice: 1
Enter data: 10
Do you want to continue? Press 1: 1

Select the operation to be performed on stack
1. Push
2. Pop
3. Display
Enter your choice: 1
Enter data: 20
Do you want to continue? Press 1: 1

Select the operation to be performed on stack
1. Push
2. Pop
3. Display
Enter your choice: 3
Stack entries are:
20
10`,
    code: `#include <stdio.h>
#include <conio.h>

int stk[100];
int n, top = -1;
int ch, data, i;

void push();
void pop();
void display();

int main()
{
    printf("Enter the size of stack: ");
    scanf("%d", &n);
    do
    {
        printf("\\nSelect the operation to be performed on stack");
        printf("\\n1. Push");
        printf("\\n2. Pop");
        printf("\\n3. Display");
        printf("\\nEnter your choice: ");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            push();
            break;
        case 2:
            pop();
            break;
        case 3:
            display();
            break;
        default:
            printf("\\nInvalid input");
        }
        printf("\\nDo you want to continue? Press 1: ");
        scanf("%d", &ch);
    } while (ch == 1);
    return 0;
}

void push()
{
    if (top == n)
    {
        printf("\\nStack Overflow");
    }
    else
    {
        printf("\\nEnter data: ");
        scanf("%d", &data);
        stk[top] = data;
        top++;
    }
}

void pop()
{
    if (top == -1)
    {
        printf("\\nStack Underflow");
    }
    else
    {
        top--;
        data = stk[top];
        printf("\\nRemoved data is %d", data);
    }
}

void display()
{
    if (top == -1)
    {
        printf("\\nStack is empty");
    }
    else
    {
        printf("\\nStack entries are:");
        for (i = top - 1; i >= 0; i--)
        {
            printf("\\n%d", stk[i]);
        }
    }
}`
  },
  {
    id: 2,
    slug: "exp-2",
    number: "Experiment 02",
    shortNumber: "02",
    category: "Stack Application",
    title: "Write a program to evaluate a given postfix expression using stacks",
    aim: "Write a program to evaluate a given postfix expression using stacks.",
    objective: "To evaluate a given postfix expression using a stack.",
    theory: "Postfix notation (Reversed Polish Notation) places operators after their operands (e.g. ab+). An operand is pushed onto the stack, and an operator pops the top two operands, evaluates them, and pushes the result back.",
    sampleOutput: `There are only four operators (*, /, +, -) in an expression and operand is single digit.

Enter postfix expression, 
press right parenthesis ')' for end expression: 23+)

Result of expression evaluation: 5`,
    code: `#include <stdio.h>
#include <ctype.h>

#define MAXSTACK 100
#define POSTFIXSIZE 100

int stack[MAXSTACK];
int top = -1;

void push(int item)
{
    if (top >= MAXSTACK - 1)
    {
        printf("Stack overflow\\n");
        return;
    }
    else
    {
        top = top + 1;
        stack[top] = item;
    }
}

int pop()
{
    int item;
    if (top < 0)
    {
        printf("Stack underflow\\n");
        return -1;
    }
    else
    {
        item = stack[top];
        top = top - 1;
        return item;
    }
}

void EvalPostfix(char postfix[])
{
    int i;
    char ch;
    int val;
    int A, B;

    for (i = 0; postfix[i] != ')'; i++)
    {
        ch = postfix[i];
        if (isdigit(ch))
        {
            push(ch - '0');
        }
        else if (ch == '+' || ch == '-' || ch == '*' || ch == '/')
        {
            A = pop();
            B = pop();
            switch (ch)
            {
            case '*':
                val = B * A;
                break;
            case '/':
                val = B / A;
                break;
            case '+':
                val = B + A;
                break;
            case '-':
                val = B - A;
                break;
            }
            push(val);
        }
    }
    printf("\\nResult of expression evaluation: %d\\n", pop());
}

int main()
{
    int i;
    char postfix[POSTFIXSIZE];
    printf("There are only four operators (*, /, +, -) ");
    printf("in an expression and operand is single digit.\\n");
    printf("\\nEnter postfix expression, ");
    printf("\\npress right parenthesis ')' for end expression: ");
    for (i = 0; i <= POSTFIXSIZE - 1; i++)
    {
        scanf("%c", &postfix[i]);
        if (postfix[i] == ')')
        {
            break;
        }
    }
    EvalPostfix(postfix);
    return 0;
}`
  },
  {
    id: 3,
    slug: "exp-3",
    number: "Experiment 03",
    shortNumber: "03",
    category: "Stack Application",
    title: "Write a program to convert a given infix expression to postfix form using stacks.",
    aim: "Write a program to convert a given infix expression to postfix form using stacks.",
    objective: "To convert a given infix expression into its equivalent postfix expression using a stack.",
    theory: "Infix to Postfix conversion scans tokens from left to right. Operands are output directly; operators and parentheses are managed via stack according to precedence and associativity.",
    sampleOutput: `The infix expression contains single letter variables and single digit constants.

Enter Infix expression: A+B*C
Postfix Expression: ABC*+`,
    code: `#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define SIZE 100

char stack[SIZE];
int top = -1;

void push(char item)
{
    if (top >= SIZE - 1)
    {
        printf("\\nStack Overflow.");
    }
    else
    {
        top = top + 1;
        stack[top] = item;
    }
}

char pop()
{
    char item;
    if (top < 0)
    {
        printf("\\nStack Underflow: Invalid infix expression.");
        exit(1);
    }
    else
    {
        item = stack[top];
        top = top - 1;
        return item;
    }
}

int is_operator(char symbol)
{
    if (symbol == '^' || symbol == '*' || symbol == '/' ||
        symbol == '+' || symbol == '-')
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

int precedence(char symbol)
{
    if (symbol == '^')
    {
        return 3;
    }
    else if (symbol == '*' || symbol == '/')
    {
        return 2;
    }
    else if (symbol == '+' || symbol == '-')
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

void InfixToPostfix(char infix_exp[], char postfix_exp[])
{
    int i, j;
    char item;
    char x;
    push('(');
    /* Add ')' at the end of infix expression */
    strcat(infix_exp, ")");
    i = 0;
    j = 0;
    item = infix_exp[i];
    while (item != '\\0')
    {
        if (item == '(')
        {
            push(item);
        }
        else if (isdigit(item) || isalpha(item))
        {
            postfix_exp[j] = item;
            j++;
        }
        else if (is_operator(item) == 1)
        {
            x = pop();
            while (is_operator(x) == 1 &&
                   precedence(x) >= precedence(item))
            {
                postfix_exp[j] = x;
                j++;
                x = pop();
            }
            push(x);
            push(item);
        }
        else if (item == ')')
        {
            x = pop();
            while (x != '(')
            {
                postfix_exp[j] = x;
                j++;
                x = pop();
            }
        }
        else
        {
            printf("\\nInvalid infix expression.\\n");
            exit(1);
        }
        i++;
        item = infix_exp[i];
    }
    if (top > 0)
    {
        printf("\\nInvalid infix expression.\\n");
        exit(1);
    }
    postfix_exp[j] = '\\0';
}

int main()
{
    char infix[SIZE];
    char postfix[SIZE];
    printf("The infix expression contains single letter variables "
           "and single digit constants.\\n");
    printf("\\nEnter Infix expression: ");
    fgets(infix, SIZE, stdin);
    /* Remove newline character */
    infix[strcspn(infix, "\\n")] = '\\0';
    InfixToPostfix(infix, postfix);
    printf("Postfix Expression: ");
    puts(postfix);
    return 0;
}`
  },
  {
    id: 4,
    slug: "exp-4",
    number: "Experiment 04",
    shortNumber: "04",
    category: "Queue",
    title: "Write a program to implement circular queue using arrays.",
    aim: "Write a program to implement a circular queue using arrays.",
    objective: "To implement a circular queue using an array and perform insertion and deletion operations efficiently.",
    theory: "A circular queue connects the last position back to the first position like a ring buffer. This overcomes the memory wastage limitation of a simple linear array queue.",
    sampleOutput: `1. Insert
2. Delete
3. Display
4. Quit
Enter your choice: 1
Input the element for insertion in queue: 10
...
Queue elements: 10 20 30
Element deleted from queue is: 10
Queue elements: 20 30`,
    code: `#include <stdio.h>

#define MAX 5

int cqueue_arr[MAX];
int front = -1;
int rear = -1;

void insert(int item)
{
    if ((front == 0 && rear == MAX - 1) ||
        (front == rear + 1))
    {
        printf("Queue Overflow\\n");
        return;
    }
    if (front == -1) /* If queue is empty */
    {
        front = 0;
        rear = 0;
    }
    else
    {
        if (rear == MAX - 1) /* Rear is at last position */
            rear = 0;
        else
            rear = rear + 1;
    }
    cqueue_arr[rear] = item;
}

void del()
{
    if (front == -1)
    {
        printf("Queue Underflow\\n");
        return;
    }
    printf("Element deleted from queue is: %d\\n",
           cqueue_arr[front]);
    if (front == rear) /* Queue has only one element */
    {
        front = -1;
        rear = -1;
    }
    else
    {
        if (front == MAX - 1)
            front = 0;
        else
            front = front + 1;
    }
}

void display()
{
    int front_pos = front;
    int rear_pos = rear;
    if (front == -1)
    {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements: ");
    if (front_pos <= rear_pos)
    {
        while (front_pos <= rear_pos)
        {
            printf("%d ", cqueue_arr[front_pos]);
            front_pos++;
        }
    }
    else
    {
        while (front_pos <= MAX - 1)
        {
            printf("%d ", cqueue_arr[front_pos]);
            front_pos++;
        }
        front_pos = 0;
        while (front_pos <= rear_pos)
        {
            printf("%d ", cqueue_arr[front_pos]);
            front_pos++;
        }
    }
    printf("\\n");
}

int main()
{
    int choice, item;
    do
    {
        printf("\\n1. Insert\\n");
        printf("2. Delete\\n");
        printf("3. Display\\n");
        printf("4. Quit\\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            printf("Input the element for insertion in queue: ");
            scanf("%d", &item);
            insert(item);
            break;
        case 2:
            del();
            break;
        case 3:
            display();
            break;
        case 4:
            break;
        default:
            printf("Wrong choice\\n");
        }
    } while (choice != 4);
    return 0;
}`
  },
  {
    id: 5,
    slug: "exp-5",
    number: "Experiment 05",
    shortNumber: "05",
    category: "Queue",
    title: "Write a program to implement double ended queue (dequeue) using arrays.",
    aim: "Write a program to implement double ended queue (dequeue) using arrays.",
    objective: "To implement a double ended queue (deque) using an array and perform insertion and deletion from both ends.",
    theory: "A Deque (Double Ended Queue) is a generalized queue where insertion and deletion can occur at both the front (left) and rear (right) ends. It supports input-restricted and output-restricted modes.",
    sampleOutput: `1. Input restricted dequeue
2. Output restricted dequeue
Enter your choice: 1

1. Insert at right
2. Delete from left
3. Delete from right
4. Display
5. Quit
Enter your choice: 1
Input the element for adding in queue: 10
...
Queue elements: 10 20 30
Element deleted from queue is: 10
Queue elements: 20 30`,
    code: `#include <stdio.h>

#define MAX 5

int deque_arr[MAX];
int left = -1;
int right = -1;

/* Insert element from right */
void insert_right()
{
    int added_item;
    if ((left == 0 && right == MAX - 1) ||
        (left == right + 1))
    {
        printf("Queue Overflow\\n");
        return;
    }
    if (left == -1) /* Queue is initially empty */
    {
        left = 0;
        right = 0;
    }
    else if (right == MAX - 1)
    {
        right = 0;
    }
    else
    {
        right = right + 1;
    }
    printf("Input the element for adding in queue: ");
    scanf("%d", &added_item);
    deque_arr[right] = added_item;
}

/* Insert element from left */
void insert_left()
{
    int added_item;
    if ((left == 0 && right == MAX - 1) ||
        (left == right + 1))
    {
        printf("Queue Overflow\\n");
        return;
    }
    if (left == -1) /* Queue is initially empty */
    {
        left = 0;
        right = 0;
    }
    else if (left == 0)
    {
        left = MAX - 1;
    }
    else
    {
        left = left - 1;
    }
    printf("Input the element for adding in queue: ");
    scanf("%d", &added_item);
    deque_arr[left] = added_item;
}

/* Delete element from left */
void delete_left()
{
    if (left == -1)
    {
        printf("Queue Underflow\\n");
        return;
    }
    printf("Element deleted from queue is: %d\\n",
           deque_arr[left]);
    if (left == right) /* Queue has only one element */
    {
        left = -1;
        right = -1;
    }
    else if (left == MAX - 1)
    {
        left = 0;
    }
    else
    {
        left = left + 1;
    }
}

/* Delete element from right */
void delete_right()
{
    if (left == -1)
    {
        printf("Queue Underflow\\n");
        return;
    }
    printf("Element deleted from queue is: %d\\n",
           deque_arr[right]);
    if (left == right) /* Queue has only one element */
    {
        left = -1;
        right = -1;
    }
    else if (right == 0)
    {
        right = MAX - 1;
    }
    else
    {
        right = right - 1;
    }
}

/* Display deque */
void display_queue()
{
    int front_pos = left;
    int rear_pos = right;
    if (left == -1)
    {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements: ");
    if (front_pos <= rear_pos)
    {
        while (front_pos <= rear_pos)
        {
            printf("%d ", deque_arr[front_pos]);
            front_pos++;
        }
    }
    else
    {
        while (front_pos <= MAX - 1)
        {
            printf("%d ", deque_arr[front_pos]);
            front_pos++;
        }
        front_pos = 0;
        while (front_pos <= rear_pos)
        {
            printf("%d ", deque_arr[front_pos]);
            front_pos++;
        }
    }
    printf("\\n");
}

/* Input Restricted Deque */
void input_que()
{
    int choice;
    do
    {
        printf("\\n1. Insert at right\\n");
        printf("2. Delete from left\\n");
        printf("3. Delete from right\\n");
        printf("4. Display\\n");
        printf("5. Quit\\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            insert_right();
            break;
        case 2:
            delete_left();
            break;
        case 3:
            delete_right();
            break;
        case 4:
            display_queue();
            break;
        case 5:
            break;
        default:
            printf("Wrong choice\\n");
        }
    } while (choice != 5);
}

/* Output Restricted Deque */
void output_que()
{
    int choice;
    do
    {
        printf("\\n1. Insert at right\\n");
        printf("2. Insert at left\\n");
        printf("3. Delete from left\\n");
        printf("4. Display\\n");
        printf("5. Quit\\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            insert_right();
            break;
        case 2:
            insert_left();
            break;
        case 3:
            delete_left();
            break;
        case 4:
            display_queue();
            break;
        case 5:
            break;
        default:
            printf("Wrong choice\\n");
        }
    } while (choice != 5);
}

int main()
{
    int choice;
    printf("1. Input restricted dequeue\\n");
    printf("2. Output restricted dequeue\\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);
    switch (choice)
    {
    case 1:
        input_que();
        break;
    case 2:
        output_que();
        break;
    default:
        printf("Wrong choice\\n");
    }
    return 0;
}`
  },
  {
    id: 6,
    slug: "exp-6",
    number: "Experiment 06",
    shortNumber: "06",
    category: "Stack using Queues",
    title: "Write a program to implement a stack using two queues such that the push operation runs in constant time and the pop operation runs in linear time.",
    aim: "Write a program to implement a stack using two queues such that the push operation runs in constant time and the pop operation runs in linear time.",
    objective: "To implement a stack using two queues such that the push operation takes O(1) time and the pop operation takes O(n) time.",
    theory: "Constant-time push: Insert element directly into the queue in O(1). During pop, transfer n-1 elements to re-reach the most recently inserted item, taking O(n) linear time.",
    sampleOutput: `[1] Push
[2] Pop
[0] Exit
Choice: 1
Enter value to Push: 10
__________________________
Current Queue:
[10] 
Pushed Value: 10
__________________________

[1] Push
[2] Pop
[0] Exit
Choice: 2
__________________________
Current Queue:
Popped Value: 10
__________________________`,
    code: `#include <stdio.h>
#include <stdlib.h>

#define QUEUE_EMPTY_MAGIC 0xdeadbeef

typedef struct _queue_t
{
    int *arr;
    int rear;
    int front;
    int count;
    int max;
} queue_t;

/* Function declarations */
queue_t *queue_allocate(int n);
void queue_insert(queue_t *q, int v);
int queue_remove(queue_t *q);
int queue_count(queue_t *q);
int queue_is_empty(queue_t *q);
void queue_display(queue_t *q);

/* Stack operations using queue */
void stack_push(queue_t *q, int v)
{
    queue_insert(q, v);
}

int stack_pop(queue_t *q)
{
    int i;
    int n = queue_count(q);
    int removed_element;
    if (queue_is_empty(q))
        return QUEUE_EMPTY_MAGIC;
    for (i = 0; i < n - 1; i++)
    {
        removed_element = queue_remove(q);
        queue_insert(q, removed_element);
    }
    removed_element = queue_remove(q);
    return removed_element;
}

int stack_is_empty(queue_t *q)
{
    return queue_is_empty(q);
}

int stack_count(queue_t *q)
{
    return queue_count(q);
}

/* Return number of elements in queue */
int queue_count(queue_t *q)
{
    return q->count;
}

/* Allocate queue */
queue_t *queue_allocate(int n)
{
    queue_t *queue;
    queue = malloc(sizeof(queue_t));
    if (queue == NULL)
        return NULL;
    queue->max = n;
    queue->arr = malloc(sizeof(int) * n);
    if (queue->arr == NULL)
    {
        free(queue);
        return NULL;
    }
    queue->rear = n - 1;
    queue->front = n - 1;
    queue->count = 0;
    return queue;
}

/* Insert element into queue */
void queue_insert(queue_t *q, int v)
{
    if (q->count == q->max)
        return;
    q->rear = (q->rear + 1) % q->max;
    q->arr[q->rear] = v;
    q->count++;
}

/* Remove element from queue */
int queue_remove(queue_t *q)
{
    int retval;
    if (q->count == 0)
        return QUEUE_EMPTY_MAGIC;
    q->front = (q->front + 1) % q->max;
    retval = q->arr[q->front];
    q->count--;
    return retval;
}

/* Check whether queue is empty */
int queue_is_empty(queue_t *q)
{
    return (q->count == 0);
}

/* Display queue */
void queue_display(queue_t *q)
{
    int i = (q->front + 1) % q->max;
    int elements = queue_count(q);
    while (elements--)
    {
        printf("[%d] ", q->arr[i]);
        i++;
        if (i >= q->max)
            i = 0;
    }
}

/* Main function */
#define MAX 128

int main(void)
{
    queue_t *q;
    int x, select;
    q = queue_allocate(MAX);
    if (q == NULL)
    {
        printf("Memory allocation failed.\\n");
        return 1;
    }
    do
    {
        printf("\\n[1] Push");
        printf("\\n[2] Pop");
        printf("\\n[0] Exit");
        printf("\\nChoice: ");
        scanf("%d", &select);
        switch (select)
        {
        case 1:
            printf("\\nEnter value to Push: ");
            scanf("%d", &x);
            stack_push(q, x);
            printf("\\n__________________________");
            printf("\\nCurrent Queue:\\n");
            queue_display(q);
            printf("\\n\\nPushed Value: %d", x);
            printf("\\n__________________________\\n");
            break;
        case 2:
            x = stack_pop(q);
            printf("\\n__________________________");
            printf("\\nCurrent Queue:\\n");
            queue_display(q);
            if (x == QUEUE_EMPTY_MAGIC)
                printf("\\n\\nNo values removed");
            else
                printf("\\n\\nPopped Value: %d", x);
            printf("\\n__________________________\\n");
            break;
        case 0:
            printf("\\nQuitting.\\n");
            free(q->arr);
            free(q);
            return 0;
        default:
            printf("\\nInvalid choice.\\n");
        }
    } while (1);
    return 0;
}`
  },
  {
    id: 7,
    slug: "exp-7",
    number: "Experiment 07",
    shortNumber: "07",
    category: "Stack using Queues",
    title: "Write a program to implement a stack using two queues such that the push operation runs in linear time and the pop operation runs in constant time.",
    aim: "Write a program to implement a stack using two queues such that the push operation runs in linear time and the pop operation runs in constant time.",
    objective: "To implement a stack using two queues such that the push operation takes O(n) time and the pop operation takes O(1) time.",
    theory: "To make pop constant time, the newest element is maintained at the front. Note: As per the lab manual PDF, the provided code implements stack and queue structures using linked nodes.",
    sampleOutput: `1. Add to queue
2. Remove from queue
3. Display
4. Exit
Enter your choice: 1
Enter the element to be added to queue: 10
...
Queue elements: 10 20 30
Deleted element: 10
Queue elements: 20 30`,
    code: `/* C program to implement queue using two stacks */
#include <stdio.h>
#include <stdlib.h>

struct node
{
    int data;
    struct node *next;
};

/* Function declarations */
void push(struct node **top, int data);
int pop(struct node **top);

struct queue
{
    struct node *stack1;
    struct node *stack2;
};

/* Insert element into queue */
void enqueue(struct queue *q, int x)
{
    push(&q->stack1, x);
}

/* Remove element from queue */
void dequeue(struct queue *q)
{
    int x;
    if (q->stack1 == NULL && q->stack2 == NULL)
    {
        printf("Queue is empty\\n");
        return;
    }
    if (q->stack2 == NULL)
    {
        while (q->stack1 != NULL)
        {
            x = pop(&q->stack1);
            push(&q->stack2, x);
        }
    }
    x = pop(&q->stack2);
    printf("Deleted element: %d\\n", x);
}

/* Push element into stack */
void push(struct node **top, int data)
{
    struct node *newnode;
    newnode = (struct node *)malloc(sizeof(struct node));
    if (newnode == NULL)
    {
        printf("Stack overflow\\n");
        return;
    }
    newnode->data = data;
    newnode->next = *top;
    *top = newnode;
}

/* Pop element from stack */
int pop(struct node **top)
{
    int buff;
    struct node *t;
    if (*top == NULL)
    {
        printf("Stack underflow\\n");
        return -1;
    }
    t = *top;
    buff = t->data;
    *top = t->next;
    free(t);
    return buff;
}

/* Display queue */
void display(struct node *top1, struct node *top2)
{
    struct node *temp;
    struct node *stack1_elements[100];
    int count = 0;
    int i;
    /*
     * Elements in stack2 are already in queue order.
     */
    temp = top2;
    while (temp != NULL)
    {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    /*
     * Elements in stack1 are in reverse order.
     * Store them and print in reverse.
     */
    temp = top1;
    while (temp != NULL)
    {
        stack1_elements[count] = temp;
        count++;
        temp = temp->next;
    }
    for (i = count - 1; i >= 0; i--)
    {
        printf("%d ", stack1_elements[i]->data);
    }
    printf("\\n");
}

int main()
{
    struct queue *q;
    int choice;
    int a;
    q = (struct queue *)malloc(sizeof(struct queue));
    if (q == NULL)
    {
        printf("Memory allocation failed\\n");
        return 1;
    }
    q->stack1 = NULL;
    q->stack2 = NULL;
    while (1)
    {
        printf("\\n1. Add to queue\\n");
        printf("2. Remove from queue\\n");
        printf("3. Display\\n");
        printf("4. Exit\\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            printf("Enter the element to be added to queue: ");
            scanf("%d", &a);
            enqueue(q, a);
            break;
        case 2:
            dequeue(q);
            break;
        case 3:
            printf("Queue elements: ");
            display(q->stack1, q->stack2);
            break;
        case 4:
            free(q);
            printf("Exiting...\\n");
            return 0;
        default:
            printf("Invalid choice\\n");
        }
    }
    return 0;
}`
  },
  {
    id: 8,
    slug: "exp-8",
    number: "Experiment 08",
    shortNumber: "08",
    category: "Queue using Stacks",
    title: "Write a program to implement a queue using two stacks such that dequeue operation runs in constant time and dequeue operation runs in linear time.",
    aim: "Write a program to implement a queue using two stacks such that dequeue operation runs in constant time and dequeue operation runs in linear time.",
    objective: "To implement a queue using two stacks and perform enqueue and dequeue operations according to the required time complexity.",
    theory: "A queue follows FIFO, while a stack follows LIFO. In this manual's implementation, the program demonstrates simulated stack/queue operations using circular buffer mechanics.",
    sampleOutput: `[1] Push
[2] Pop
[0] Exit
Choice: 1
Enter value to Push: 10
__________________________
Current Queue:
[10] 
Pushed Value: 10
__________________________
...
Popped Value: 30`,
    code: `#include <stdio.h>
#include <stdlib.h>

#define QUEUE_EMPTY_MAGIC 0xdeadbeef

/* Queue structure */
typedef struct _queue_t
{
    int *arr;
    int rear;
    int front;
    int count;
    int max;
} queue_t;

/* Queue operation function prototypes */
queue_t *queue_allocate(int n);
void queue_insert(queue_t *q, int v);
int queue_remove(queue_t *q);
int queue_count(queue_t *q);
int queue_is_empty(queue_t *q);
void queue_display(queue_t *q);

/* Stack operations */
void stack_push(queue_t *q, int v)
{
    queue_insert(q, v);
}

int stack_pop(queue_t *q)
{
    int i;
    int n = queue_count(q);
    int removed_element;
    if (n == 0)
        return QUEUE_EMPTY_MAGIC;
    for (i = 0; i < n - 1; i++)
    {
        removed_element = queue_remove(q);
        queue_insert(q, removed_element);
    }
    removed_element = queue_remove(q);
    return removed_element;
}

int stack_is_empty(queue_t *q)
{
    return queue_is_empty(q);
}

int stack_count(queue_t *q)
{
    return queue_count(q);
}

/* Queue operations */
int queue_count(queue_t *q)
{
    return q->count;
}

queue_t *queue_allocate(int n)
{
    queue_t *queue;
    queue = malloc(sizeof(queue_t));
    if (queue == NULL)
        return NULL;
    queue->max = n;
    queue->arr = malloc(sizeof(int) * n);
    if (queue->arr == NULL)
    {
        free(queue);
        return NULL;
    }
    queue->rear = n - 1;
    queue->front = n - 1;
    queue->count = 0;
    return queue;
}

void queue_insert(queue_t *q, int v)
{
    if (q->count == q->max)
        return;
    q->rear = (q->rear + 1) % q->max;
    q->arr[q->rear] = v;
    q->count++;
}

int queue_remove(queue_t *q)
{
    int retval;
    /* Return magic number if queue is empty */
    if (q->count == 0)
        return QUEUE_EMPTY_MAGIC;
    q->front = (q->front + 1) % q->max;
    retval = q->arr[q->front];
    q->count--;
    return retval;
}

int queue_is_empty(queue_t *q)
{
    return (q->count == 0);
}

/* Display queue */
void queue_display(queue_t *q)
{
    int i = (q->front + 1) % q->max;
    int elements = queue_count(q);
    while (elements--)
    {
        printf("[%d] ", q->arr[i]);
        i++;
        if (i >= q->max)
            i = 0;
    }
}

/* Main function */
#define MAX 128

int main(void)
{
    queue_t *q;
    int x, select;
    q = queue_allocate(MAX);
    if (q == NULL)
    {
        printf("Memory allocation failed.\\n");
        return 1;
    }
    do
    {
        printf("\\n[1] Push");
        printf("\\n[2] Pop");
        printf("\\n[0] Exit");
        printf("\\nChoice: ");
        scanf("%d", &select);
        switch (select)
        {
        case 1:
            printf("\\nEnter value to Push: ");
            scanf("%d", &x);
            /* Pushing */
            stack_push(q, x);
            printf("\\n\\n__________________________");
            printf("\\nCurrent Queue:\\n");
            queue_display(q);
            printf("\\n\\nPushed Value: %d", x);
            printf("\\n__________________________\\n");
            break;
        case 2:
            /* Popping */
            x = stack_pop(q);
            printf("\\n\\n__________________________");
            printf("\\nCurrent Queue:\\n");
            queue_display(q);
            if (x == QUEUE_EMPTY_MAGIC)
                printf("\\n\\nNo values removed");
            else
                printf("\\n\\nPopped Value: %d", x);
            printf("\\n__________________________\\n");
            break;
        case 0:
            printf("\\nQuitting.\\n");
            free(q->arr);
            free(q);
            return 0;
        default:
            printf("\\nInvalid choice.\\n");
        }
    } while (1);
    return 0;
}`
  },
  {
    id: 9,
    slug: "exp-9a",
    number: "Experiment 09 (a)",
    shortNumber: "09a",
    category: "Linked List",
    title: "Write programs to implement the following data structures: (a) Single linked list",
    aim: "Write programs to implement Single linked list with creation, insertion, deletion, traversal, and searching.",
    objective: "To implement a singly linked list and perform operations such as creation, insertion, deletion, traversal, and searching.",
    theory: "A Singly Linked List is a sequence of nodes where each node contains data and a next pointer pointing to the successor node. Traversal is unidirectional forward.",
    sampleOutput: `Linked list: 3 2 5 1 4
After deleting an element: 2 5 1 4
3 is not found
Sorted List: 1 2 4 5`,
    code: `/* Code: SINGLE LINK LIST */
#include <stdio.h>
#include <stdlib.h>

/* Create a node */
struct Node
{
    int data;
    struct Node *next;
};

/* Insert a node at the beginning */
void insertAtBeginning(struct Node **head_ref, int new_data)
{
    struct Node *new_node;
    new_node = (struct Node *)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = *head_ref;
    *head_ref = new_node;
}

/* Insert a node after a given node */
void insertAfter(struct Node *prev_node, int new_data)
{
    struct Node *new_node;
    if (prev_node == NULL)
    {
        printf("The given previous node cannot be NULL\\n");
        return;
    }
    new_node = (struct Node *)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = prev_node->next;
    prev_node->next = new_node;
}

/* Insert a node at the end */
void insertAtEnd(struct Node **head_ref, int new_data)
{
    struct Node *new_node;
    struct Node *last;
    new_node = (struct Node *)malloc(sizeof(struct Node));
    last = *head_ref;
    new_node->data = new_data;
    new_node->next = NULL;
    /* If the list is empty */
    if (*head_ref == NULL)
    {
        *head_ref = new_node;
        return;
    }
    /* Find the last node */
    while (last->next != NULL)
    {
        last = last->next;
    }
    last->next = new_node;
}

/* Delete a node */
void deleteNode(struct Node **head_ref, int key)
{
    struct Node *temp = *head_ref;
    struct Node *prev;
    /* If the first node contains the key */
    if (temp != NULL && temp->data == key)
    {
        *head_ref = temp->next;
        free(temp);
        return;
    }
    /* Search for the node */
    while (temp != NULL && temp->data != key)
    {
        prev = temp;
        temp = temp->next;
    }
    /* If key is not found */
    if (temp == NULL)
    {
        return;
    }
    /* Remove the node */
    prev->next = temp->next;
    free(temp);
}

/* Search for a node */
int searchNode(struct Node **head_ref, int key)
{
    struct Node *current = *head_ref;
    while (current != NULL)
    {
        if (current->data == key)
        {
            return 1;
        }
        current = current->next;
    }
    return 0;
}

/* Sort the linked list */
void sortLinkedList(struct Node **head_ref)
{
    struct Node *current = *head_ref;
    struct Node *index = NULL;
    int temp;
    if (*head_ref == NULL)
    {
        return;
    }
    while (current != NULL)
    {
        index = current->next;
        while (index != NULL)
        {
            if (current->data > index->data)
            {
                temp = current->data;
                current->data = index->data;
                index->data = temp;
            }
            index = index->next;
        }
        current = current->next;
    }
}

/* Print the linked list */
void printList(struct Node *node)
{
    while (node != NULL)
    {
        printf("%d ", node->data);
        node = node->next;
    }
}

/* Main function */
int main()
{
    struct Node *head = NULL;
    int item_to_find = 3;
    /* Insert elements */
    insertAtEnd(&head, 1);
    insertAtBeginning(&head, 2);
    insertAtBeginning(&head, 3);
    insertAtEnd(&head, 4);
    /* Insert 5 after the second node */
    insertAfter(head->next, 5);
    printf("Linked list: ");
    printList(head);
    /* Delete an element */
    printf("\\nAfter deleting an element: ");
    deleteNode(&head, 3);
    printList(head);
    /* Search for an element */
    if (searchNode(&head, item_to_find))
    {
        printf("\\n%d is found", item_to_find);
    }
    else
    {
        printf("\\n%d is not found", item_to_find);
    }
    /* Sort the linked list */
    sortLinkedList(&head);
    printf("\\nSorted List: ");
    printList(head);
    return 0;
}`
  },
  {
    id: 10,
    slug: "exp-9b",
    number: "Experiment 09 (b)",
    shortNumber: "09b",
    category: "Linked List",
    title: "Write programs to implement the following data structures: (b) Double linked list",
    aim: "Write programs to implement Doubly linked list with forward and backward navigation, insertion, deletion, and traversal.",
    objective: "To implement a doubly linked list and perform insertion, deletion, traversal, and searching operations.",
    theory: "A Doubly Linked List has nodes with two pointers: next (successor) and prev (predecessor). This allows bidirectional traversal at the cost of one extra pointer per node.",
    sampleOutput: `Doubly Linked List:
6->11->15->1->5->9->NULL
After deleting the last node:
6->11->15->1->5->NULL`,
    code: `/* CODE: Double Linked List */
#include <stdio.h>
#include <stdlib.h>

/* Node creation */
struct Node
{
    int data;
    struct Node *next;
    struct Node *prev;
};

/* Insert node at the front */
void insertFront(struct Node **head, int data)
{
    struct Node *newNode;
    newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    newNode->prev = NULL;
    if (*head != NULL)
    {
        (*head)->prev = newNode;
    }
    *head = newNode;
}

/* Insert a node after a specific node */
void insertAfter(struct Node *prev_node, int data)
{
    struct Node *newNode;
    if (prev_node == NULL)
    {
        printf("Previous node cannot be NULL\\n");
        return;
    }
    newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = prev_node->next;
    newNode->prev = prev_node;
    prev_node->next = newNode;
    if (newNode->next != NULL)
    {
        newNode->next->prev = newNode;
    }
}

/* Insert a node at the end */
void insertEnd(struct Node **head, int data)
{
    struct Node *newNode;
    struct Node *temp;
    newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    if (*head == NULL)
    {
        newNode->prev = NULL;
        *head = newNode;
        return;
    }
    temp = *head;
    while (temp->next != NULL)
    {
        temp = temp->next;
    }
    temp->next = newNode;
    newNode->prev = temp;
}

/* Delete a node */
void deleteNode(struct Node **head, struct Node *del_node)
{
    if (*head == NULL || del_node == NULL)
    {
        return;
    }
    if (*head == del_node)
    {
        *head = del_node->next;
    }
    if (del_node->next != NULL)
    {
        del_node->next->prev = del_node->prev;
    }
    if (del_node->prev != NULL)
    {
        del_node->prev->next = del_node->next;
    }
    free(del_node);
}

/* Display the doubly linked list */
void displayList(struct Node *node)
{
    while (node != NULL)
    {
        printf("%d->", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

/* Main function */
int main()
{
    struct Node *head = NULL;
    insertEnd(&head, 5);
    insertFront(&head, 1);
    insertFront(&head, 6);
    insertEnd(&head, 9);
    insertAfter(head, 11);
    insertAfter(head->next, 15);
    printf("Doubly Linked List:\\n");
    displayList(head);
    /* Delete the last node */
    deleteNode(&head, head->next->next->next->next->next);
    printf("After deleting the last node:\\n");
    displayList(head);
    return 0;
}`
  }
];

