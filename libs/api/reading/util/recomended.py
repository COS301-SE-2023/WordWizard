import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
data = pd.read_csv('data.csv')
X = data['level'].values.reshape(-1, 1)
y = data['word'].values
encoder = LabelEncoder()
y = encoder.fit_transform(y)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = tf.keras.Sequential()
model.add(tf.keras.layers.Dense(64, input_shape=(1,), activation='relu'))
model.add(tf.keras.layers.Dense(64, activation='relu'))
model.add(tf.keras.layers.Dense(len(encoder.classes_), activation='softmax'))
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=25)
predictions = model.predict([[2]])
predicted_classes = tf.argmax(predictions, axis=1)
predicted_words = encoder.inverse_transform(predicted_classes)
print(predicted_words)
# model.save('ww_model.h5')