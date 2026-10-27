class Node {
  public:
    int value;
    Node *next;

    Node(int value) {
      this->value = value;
      next = nullptr;
    }
};

class LinkedList {
  private:
    Node *head;
    Node *tail;
    int length;

  public:
    LinkedList(int value) {
      Node *newNode = new Node(value);
      head = newNode;
      tail = newNode;
      length = 1;
    }
};