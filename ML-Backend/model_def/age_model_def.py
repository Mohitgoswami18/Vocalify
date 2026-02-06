import torch.nn as nn

class Age_classifier(nn.Module):
  def __init__(self, hidden_layers=3, neurons_per_layer=114, dropout=0.1601497616879165, num_classes=5):
        super().__init__()

        layers = []
        input_size = 768

        # First layer with BatchNorm
        layers.extend([
            nn.Linear(input_size, neurons_per_layer),
            nn.BatchNorm1d(neurons_per_layer),
            nn.ReLU(),
            nn.Dropout(dropout)
        ])

        # Hidden layers
        for _ in range(hidden_layers - 1):
            layers.extend([
                nn.Linear(neurons_per_layer, neurons_per_layer),
                nn.BatchNorm1d(neurons_per_layer),
                nn.ReLU(),
                nn.Dropout(dropout)
            ])

        # Output layer
        layers.append(nn.Linear(neurons_per_layer, num_classes))

        self.classifier = nn.Sequential(*layers)

  def forward(self, embeddings):
      # Simple mean pooling across time dimension
      pooled = embeddings.mean(dim=1) # Check by removing this one time also
      return self.classifier(pooled)
