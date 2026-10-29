#include <iostream>
using namespace std;

class Node {
  public:
    int value;
    Node *next;
    Node *prev;

    Node(int value){
      this->value = value;
      next = nullptr;
      prev = nullptr;
    }
};

class DoublyLinkedList {
  private:
    Node *head;
    Node *tail;
    int length;

  public:
    DoublyLinkedList(int value) {
      Node *newNode = new Node(value);
      head = newNode;
      tail = newNode;
      length = 1;
    }

    void printList() {
      Node *temp = head;
      while(temp) {
        cout << temp->value << endl;
        temp = temp->next;
      }
    }

    void getHead(){}

    void getTail(){}

    void getLength(){}
};