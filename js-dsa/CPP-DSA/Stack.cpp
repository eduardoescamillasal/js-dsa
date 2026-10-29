class Node {
  public:
    int value;
    Node *next;

    Node(int value){
      this->value = value;
      next = nullptr;
    }
};

class Stack {
  private:
    Node *top;
    int height;

  public:
    Stack(int value){
      Node *newNode = new Node(value);
      top = newNode;
      height = 1;
    }
};