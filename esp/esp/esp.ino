void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(33, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int button = digitalRead(33);
  Serial.println(button);
}
